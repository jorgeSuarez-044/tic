const { storage } = require('./storage');

exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;
  
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };
  
  // Manejar solicitudes pre-flight OPTIONS
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    // Rutas para las lecciones
    if (path === '/lessons' && method === 'GET') {
      const lessons = await storage.getLessons();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(lessons)
      };
    }
    
    // Ruta para una lección específica por slug
    if (path.match(/\/lessons\/[a-z-]+/) && method === 'GET') {
      const slug = path.split('/').pop();
      const lesson = await storage.getLessonBySlug(slug);
      
      if (!lesson) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Lección no encontrada' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(lesson)
      };
    }
    
    // Ruta para ejercicios de una lección
    if (path.match(/\/exercises\/\d+/) && method === 'GET') {
      const lessonId = parseInt(path.split('/').pop());
      const exercises = await storage.getExercises(lessonId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(exercises)
      };
    }
    
    // Ruta para verificar un ejercicio
    if (path === '/verify-exercise' && method === 'POST') {
      const { exerciseId, code, input } = JSON.parse(event.body);
      
      const result = await storage.verifyExercise(exerciseId, code, input);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }
    
    // Ruta no encontrada
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Ruta no encontrada' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error del servidor', message: error.message })
    };
  }
};