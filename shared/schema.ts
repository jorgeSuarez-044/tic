import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  progress: jsonb("progress").default('{}').$type<Record<string, { completed: boolean, score: number }>>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Lesson model
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  level: text("level").notNull(),
  category: text("category").notNull(),
});

export const insertLessonSchema = createInsertSchema(lessons).pick({
  title: true,
  slug: true,
  description: true,
  content: true,
  order: true,
  level: true,
  category: true,
});

// Exercise model
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  startingCode: text("startingCode").notNull(),
  solutionCode: text("solutionCode").notNull(),
  hints: jsonb("hints").default('[]').$type<string[]>(),
  lessonId: integer("lessonId").notNull(),
  testCases: jsonb("testCases").default('[]').$type<{ input: string, expected: string }[]>(),
  order: integer("order").notNull(),
});

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  title: true,
  description: true,
  instructions: true,
  startingCode: true,
  solutionCode: true,
  hints: true,
  lessonId: true,
  testCases: true,
  order: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

// Define the progress type
export type UserProgress = {
  lessonId: number;
  exerciseId: number;
  completed: boolean;
  score: number;
};
