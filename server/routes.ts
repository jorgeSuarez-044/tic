import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertLessonSchema, insertExerciseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");
  
  // Lessons
  app.get("/api/lessons", async (req, res) => {
    try {
      const lessons = await storage.getLessons();
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener lecciones" });
    }
  });

  app.get("/api/lessons/:slug", async (req, res) => {
    try {
      const lesson = await storage.getLessonBySlug(req.params.slug);
      if (!lesson) {
        return res.status(404).json({ message: "Lección no encontrada" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la lección" });
    }
  });

  // Exercises
  app.get("/api/lessons/:lessonId/exercises", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const exercises = await storage.getExercises(lessonId);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener ejercicios" });
    }
  });

  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const exercise = await storage.getExercise(id);
      if (!exercise) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el ejercicio" });
    }
  });

  // Code verification
  const verifyCodeSchema = z.object({
    code: z.string(),
    input: z.string().optional(),
  });

  app.post("/api/exercises/:id/verify", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const parseResult = verifyCodeSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Datos de entrada inválidos" });
      }
      
      const { code, input = "" } = parseResult.data;
      const result = await storage.verifyExercise(id, code, input);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al verificar el código" });
    }
  });

  // User Progress
  app.post("/api/user/progress", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      // For demo, we'll use a hardcoded user ID
      const userId = 1;
      
      const progressSchema = z.object({
        lessonId: z.number(),
        exerciseId: z.number(),
        completed: z.boolean(),
        score: z.number(),
      });
      
      const parseResult = progressSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ message: "Datos de entrada inválidos" });
      }
      
      const { lessonId, exerciseId, completed, score } = parseResult.data;
      
      // Check if user exists, create if not
      let user = await storage.getUser(userId);
      if (!user) {
        user = await storage.createUser({ 
          username: "estudiante", 
          password: "password" 
        });
      }
      
      const updatedProgress = {
        ...user.progress,
        [`${lessonId}-${exerciseId}`]: { completed, score }
      };
      
      const updatedUser = await storage.updateUserProgress(userId, updatedProgress);
      res.json({ success: true, progress: updatedUser.progress });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar progreso" });
    }
  });

  app.get("/api/user/progress", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      // For demo, we'll use a hardcoded user ID
      const userId = 1;
      
      // Check if user exists, create if not
      let user = await storage.getUser(userId);
      if (!user) {
        user = await storage.createUser({ 
          username: "estudiante", 
          password: "password" 
        });
      }
      
      res.json({ progress: user.progress });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener progreso" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
