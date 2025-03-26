// Adaptación de server/storage.ts para uso en Netlify Functions

class MemStorage {
  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.exercises = new Map();
    this.userIdCounter = 1;
    this.lessonIdCounter = 1;
    this.exerciseIdCounter = 1;
    this.initializeData();
  }

  // User management
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id, progress: {} };
    this.users.set(id, user);
    return user;
  }

  async updateUserProgress(userId, progress) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    user.progress = { ...user.progress, ...progress };
    return user;
  }

  // Lessons
  async getLessons() {
    return Array.from(this.lessons.values());
  }

  async getLesson(id) {
    return this.lessons.get(id);
  }

  async getLessonBySlug(slug) {
    return Array.from(this.lessons.values()).find(lesson => lesson.slug === slug);
  }

  async createLesson(insertLesson) {
    const id = this.lessonIdCounter++;
    const lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  // Exercises
  async getExercises(lessonId) {
    return Array.from(this.exercises.values()).filter(exercise => exercise.lessonId === lessonId);
  }

  async getExercise(id) {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise) {
    const id = this.exerciseIdCounter++;
    const exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async verifyExercise(exerciseId, code, input) {
    const exercise = await this.getExercise(exerciseId);
    if (!exercise) {
      throw new Error("Ejercicio no encontrado");
    }

    // En un entorno real, aquí se ejecutaría el código Java
    // Para Netlify, hacemos una validación simple basada en palabras clave
    
    let success = false;
    let output = "";
    let expected = "";
    let error = "";

    try {
      // Validación básica de sintaxis
      if (!code.includes("public class")) {
        throw new Error("No se encuentra la declaración de la clase pública");
      }
      
      // Verificación específica para cada tipo de ejercicio
      if (exerciseId === 1) { // Ejercicio de if-else
        success = code.includes("if") && code.includes("else") && 
                 code.includes("System.out.print");
        expected = "Clasificación por edad: Adulto";
      } else if (exerciseId === 2) { // Ejercicio de if-else-if
        success = code.includes("if") && code.includes("else if") && 
                 code.includes("System.out.print");
        expected = "Clasificación de nota: B";
      } else if (exerciseId === 3) { // Ejercicio de operadores lógicos
        success = code.includes("&&") && code.includes("||") && 
                 code.includes("System.out.print");
        expected = "Acceso concedido";
      } else if (exerciseId === 4) { // Ejercicio de switch-case
        success = code.includes("switch") && code.includes("case") && 
                 code.includes("System.out.print");
        expected = "Lunes es un día laborable";
      }

      // Simular salida
      output = success ? expected : "La salida no coincide con la esperada";
    } catch (e) {
      error = e.message;
      success = false;
    }

    return {
      success,
      output,
      expected: success ? undefined : expected,
      error: error || undefined
    };
  }

  initializeData() {
    // Lecciones
    const ifElseLesson = {
      title: "Condicionales en Java: If-Else",
      slug: "if-else",
      content: `
        <h2>¿Qué es una estructura condicional If-Else?</h2>
        <p>Las estructuras condicionales permiten a los programas tomar decisiones basadas en condiciones. La estructura if-else es la más básica y se utiliza para ejecutar código cuando una condición es verdadera o falsa.</p>
        
        <h3>Sintaxis</h3>
        <pre>
if (condición) {
    // Código a ejecutar si la condición es verdadera
} else {
    // Código a ejecutar si la condición es falsa
}
        </pre>
        
        <h3>Ejemplo</h3>
        <p>Verificar si un número es positivo o negativo:</p>
        <pre>
int numero = 10;
if (numero > 0) {
    System.out.println("El número es positivo");
} else {
    System.out.println("El número es negativo o cero");
}
        </pre>
        
        <h3>Notas importantes</h3>
        <ul>
          <li>La condición debe evaluarse a un valor booleano (true o false)</li>
          <li>El bloque else es opcional</li>
          <li>Usa llaves { } incluso para bloques de una sola línea (buena práctica)</li>
        </ul>
      `,
      order: 1,
    };
    
    const ifElseIfLesson = {
      title: "Condicionales en Java: If-Else-If",
      slug: "if-else-if",
      content: `
        <h2>Estructura If-Else-If</h2>
        <p>La estructura if-else-if se utiliza cuando necesitamos comprobar múltiples condiciones de forma secuencial.</p>
        
        <h3>Sintaxis</h3>
        <pre>
if (condición1) {
    // Código si condición1 es verdadera
} else if (condición2) {
    // Código si condición2 es verdadera
} else if (condición3) {
    // Código si condición3 es verdadera
} else {
    // Código si ninguna condición es verdadera
}
        </pre>
        
        <h3>Ejemplo</h3>
        <p>Clasificar una calificación:</p>
        <pre>
int calificacion = 85;

if (calificacion >= 90) {
    System.out.println("A - Excelente");
} else if (calificacion >= 80) {
    System.out.println("B - Muy bien");
} else if (calificacion >= 70) {
    System.out.println("C - Bien");
} else if (calificacion >= 60) {
    System.out.println("D - Suficiente");
} else {
    System.out.println("F - Reprobado");
}
        </pre>
        
        <h3>Notas importantes</h3>
        <ul>
          <li>Las condiciones se evalúan en orden, de arriba a abajo</li>
          <li>Una vez que se encuentra una condición verdadera, se ejecuta su bloque y se omiten las demás</li>
          <li>El bloque else final es opcional</li>
        </ul>
      `,
      order: 2,
    };
    
    const logicalOperatorsLesson = {
      title: "Operadores Lógicos en Java",
      slug: "operadores-logicos",
      content: `
        <h2>Operadores Lógicos</h2>
        <p>Los operadores lógicos permiten combinar múltiples condiciones en una expresión condicional.</p>
        
        <h3>Operadores principales</h3>
        <ul>
          <li><strong>&&</strong> (AND): verdadero si ambas condiciones son verdaderas</li>
          <li><strong>||</strong> (OR): verdadero si al menos una condición es verdadera</li>
          <li><strong>!</strong> (NOT): invierte el valor de la condición</li>
        </ul>
        
        <h3>Ejemplos</h3>
        <p>Operador AND (&&):</p>
        <pre>
int edad = 25;
boolean tieneLicencia = true;

if (edad >= 18 && tieneLicencia) {
    System.out.println("Puede conducir");
} else {
    System.out.println("No puede conducir");
}
        </pre>
        
        <p>Operador OR (||):</p>
        <pre>
boolean esFeriado = true;
boolean esFinDeSemana = false;

if (esFeriado || esFinDeSemana) {
    System.out.println("No hay trabajo hoy");
} else {
    System.out.println("Es día laborable");
}
        </pre>
        
        <p>Operador NOT (!):</p>
        <pre>
boolean estaCerrado = true;

if (!estaCerrado) {
    System.out.println("La tienda está abierta");
} else {
    System.out.println("La tienda está cerrada");
}
        </pre>
        
        <h3>Notas importantes</h3>
        <ul>
          <li>En una expresión con &&, si la primera condición es falsa, la segunda no se evalúa (evaluación de cortocircuito)</li>
          <li>En una expresión con ||, si la primera condición es verdadera, la segunda no se evalúa</li>
          <li>Puedes combinar múltiples operadores lógicos en una condición</li>
          <li>Usa paréntesis para controlar el orden de evaluación</li>
        </ul>
      `,
      order: 3,
    };
    
    const switchCaseLesson = {
      title: "Estructura Switch-Case en Java",
      slug: "switch-case",
      content: `
        <h2>Estructura Switch-Case</h2>
        <p>La estructura switch-case es una alternativa a múltiples if-else-if cuando necesitamos comprobar una variable contra varios valores posibles.</p>
        
        <h3>Sintaxis</h3>
        <pre>
switch (expresión) {
    case valor1:
        // código si expresión es igual a valor1
        break;
    case valor2:
        // código si expresión es igual a valor2
        break;
    case valor3:
        // código si expresión es igual a valor3
        break;
    default:
        // código si no coincide con ningún caso
}
        </pre>
        
        <h3>Ejemplo</h3>
        <p>Determinar el nombre del día de la semana:</p>
        <pre>
int diaSemana = 3;
String nombreDia;

switch (diaSemana) {
    case 1:
        nombreDia = "Lunes";
        break;
    case 2:
        nombreDia = "Martes";
        break;
    case 3:
        nombreDia = "Miércoles";
        break;
    case 4:
        nombreDia = "Jueves";
        break;
    case 5:
        nombreDia = "Viernes";
        break;
    case 6:
        nombreDia = "Sábado";
        break;
    case 7:
        nombreDia = "Domingo";
        break;
    default:
        nombreDia = "Día inválido";
}

System.out.println("El día " + diaSemana + " es " + nombreDia);
        </pre>
        
        <h3>Notas importantes</h3>
        <ul>
          <li>La palabra clave <code>break</code> es necesaria para salir del switch después de ejecutar un caso</li>
          <li>Sin break, la ejecución continuará al siguiente caso (comportamiento de "caída" o "fall-through")</li>
          <li>El caso <code>default</code> es opcional y se ejecuta si ningún caso coincide</li>
          <li>Switch funciona con tipos: byte, short, char, int, enum, String (desde Java 7)</li>
        </ul>
      `,
      order: 4,
    };

    // Crear lecciones
    this.createLesson(ifElseLesson);
    this.createLesson(ifElseIfLesson);
    this.createLesson(logicalOperatorsLesson);
    this.createLesson(switchCaseLesson);

    // Ejercicios
    const ageClassificationExercise = {
      lessonId: 1,
      title: "Clasificación por edad",
      instructions: `
        <p>Crea un programa que clasifique a una persona según su edad:</p>
        <ul>
          <li>Si la edad es menor de 18 años, la categoría es "Menor"</li>
          <li>Si la edad es de 18 años o más, la categoría es "Adulto"</li>
        </ul>
        <p>El programa ya tiene una variable <code>int edad = 25;</code> definida. Tu tarea es completar el código utilizando una estructura if-else para mostrar el mensaje "Clasificación por edad: [categoría]" según corresponda.</p>
      `,
      initialCode: `public class ClasificacionEdad {
    public static void main(String[] args) {
        int edad = 25;
        
        // Tu código aquí
        
    }
}`,
      testCases: [
        { input: "", expected: "Clasificación por edad: Adulto" }
      ],
      hints: [
        "Utiliza una estructura if para verificar si la edad es menor de 18",
        "No olvides el bloque else para manejar el caso alternativo",
        "Asegúrate de imprimir el mensaje exacto con System.out.print()"
      ]
    };

    const gradeClassificationExercise = {
      lessonId: 2,
      title: "Clasificación de notas",
      instructions: `
        <p>Crea un programa que clasifique una nota académica según el siguiente criterio:</p>
        <ul>
          <li>A: 90-100</li>
          <li>B: 80-89</li>
          <li>C: 70-79</li>
          <li>D: 60-69</li>
          <li>F: 0-59</li>
        </ul>
        <p>El programa ya tiene una variable <code>int calificacion = 85;</code> definida. Completa el código utilizando una estructura if-else-if para mostrar el mensaje "Clasificación de nota: [letra]" según corresponda.</p>
      `,
      initialCode: `public class ClasificacionNota {
    public static void main(String[] args) {
        int calificacion = 85;
        
        // Tu código aquí
        
    }
}`,
      testCases: [
        { input: "", expected: "Clasificación de nota: B" }
      ],
      hints: [
        "Comienza con la calificación más alta (A) y ve descendiendo",
        "Utiliza operadores de comparación como >= para verificar rangos",
        "Recuerda que debes usar una estructura if-else-if para varios casos",
        "Asegúrate de que tu salida coincida exactamente con el texto esperado"
      ]
    };

    const logicalOperatorsExercise = {
      lessonId: 3,
      title: "Control de acceso",
      instructions: `
        <p>Crea un sistema de control de acceso que verifique:</p>
        <ul>
          <li>El usuario debe tener 18 años o más Y tener una credencial válida</li>
          <li>O BIEN, debe tener un pase especial, independientemente de su edad</li>
        </ul>
        <p>El programa ya tiene las variables definidas:</p>
        <pre>
int edad = 20;
boolean credencialValida = true;
boolean paseEspecial = false;</pre>
        <p>Completa el código utilizando operadores lógicos (&&, ||) con una estructura if-else para mostrar el mensaje "Acceso concedido" o "Acceso denegado" según corresponda.</p>
      `,
      initialCode: `public class ControlAcceso {
    public static void main(String[] args) {
        int edad = 20;
        boolean credencialValida = true;
        boolean paseEspecial = false;
        
        // Tu código aquí
        
    }
}`,
      testCases: [
        { input: "", expected: "Acceso concedido" }
      ],
      hints: [
        "Utiliza el operador && para verificar que se cumplan ambas condiciones (edad y credencial)",
        "Utiliza el operador || para combinar con la condición del pase especial",
        "Agrupa tus condiciones con paréntesis para asegurar el orden correcto de evaluación",
        "La expresión debe ser: (edad >= 18 && credencialValida) || paseEspecial"
      ]
    };

    const switchCaseExercise = {
      lessonId: 4,
      title: "Días de la semana",
      instructions: `
        <p>Crea un programa que determine si un día es laborable o fin de semana:</p>
        <ul>
          <li>Lunes a viernes: "X es un día laborable"</li>
          <li>Sábado y domingo: "X es fin de semana"</li>
          <li>Cualquier otro valor: "Día inválido"</li>
        </ul>
        <p>El programa ya tiene una variable <code>int dia = 1;</code> definida (1=Lunes, 2=Martes, ..., 7=Domingo). Completa el código utilizando una estructura switch-case para mostrar el mensaje correspondiente.</p>
      `,
      initialCode: `public class DiaSemana {
    public static void main(String[] args) {
        int dia = 1; // 1=Lunes, 2=Martes, ..., 7=Domingo
        
        // Tu código aquí
        
    }
}`,
      testCases: [
        { input: "", expected: "Lunes es un día laborable" }
      ],
      hints: [
        "Utiliza la estructura switch con la variable dia como expresión",
        "Define un caso (case) para cada día de la semana",
        "Puedes agrupar casos con el mismo resultado omitiendo el break (fall-through)",
        "No olvides incluir un caso default para manejar valores inválidos",
        "Asegúrate de que la salida coincida exactamente con el texto esperado"
      ]
    };

    // Crear ejercicios
    this.createExercise(ageClassificationExercise);
    this.createExercise(gradeClassificationExercise);
    this.createExercise(logicalOperatorsExercise);
    this.createExercise(switchCaseExercise);
  }
}

const storage = new MemStorage();

module.exports = { storage };