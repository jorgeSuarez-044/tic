/**
 * This file contains mock data for initial development
 * In production, this data would come from the server API
 */

// Note: This is a fallback in case the API is not available
// The app should primarily use the actual API endpoints

import { Lesson, Exercise } from "@shared/schema";

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "Condicionales en Java: If-Else",
    slug: "condicionales-if-else",
    description: "Aprende a usar estructuras condicionales if-else en Java.",
    content: "# Estructuras Condicionales If-Else\n\nLas estructuras condicionales son fundamentales en la programación. Permiten que tu código tome decisiones basadas en condiciones específicas.\n\n## ¿Qué son las condicionales?\n\nLas condicionales permiten ejecutar bloques de código solo cuando se cumplen ciertas condiciones. En Java, la estructura básica es la sentencia `if`.\n\n```java\nif (condición) {\n    // Código que se ejecuta si la condición es verdadera\n} else {\n    // Código que se ejecuta si la condición es falsa\n}\n```\n\nLa **condición** debe ser una expresión que se evalúe a un valor booleano (`true` o `false`).\n\n## Ejemplo práctico\n\nVeremos un ejemplo que comprueba si un número es positivo, negativo o cero:\n\n```java\nint numero = 10;\n\nif (numero > 0) {\n    System.out.println(\"El número es positivo\");\n} else if (numero < 0) {\n    System.out.println(\"El número es negativo\");\n} else {\n    System.out.println(\"El número es cero\");\n}\n```\n\n## Consejos y mejores prácticas\n\n- Usa llaves `{ }` incluso para bloques de una sola línea para evitar errores comunes.\n- La condición siempre debe evaluarse a un valor booleano (verdadero o falso).\n- Puedes anidar estructuras `if` dentro de otras, pero intenta no exceder 3 niveles para mantener la legibilidad.\n- Evita condiciones muy complejas. Si una condición es difícil de entender, divídela en variables con nombres descriptivos.",
    order: 1,
    level: "Principiante",
    category: "Fundamentos"
  },
  {
    id: 2,
    title: "Condicionales if-else-if",
    slug: "condicionales-if-else-if",
    description: "Aprende a usar múltiples condiciones con if-else-if en Java.",
    content: "# Condicionales if-else-if\n\nEn esta lección aprenderás a usar estructuras if-else-if para manejar múltiples condiciones en Java.\n\n## La estructura if-else-if\n\nCuando necesitas evaluar múltiples condiciones, puedes usar la estructura `if-else-if`:\n\n```java\nif (condición1) {\n    // Se ejecuta si condición1 es verdadera\n} else if (condición2) {\n    // Se ejecuta si condición1 es falsa y condición2 es verdadera\n} else if (condición3) {\n    // Se ejecuta si condición1 y condición2 son falsas y condición3 es verdadera\n} else {\n    // Se ejecuta si todas las condiciones anteriores son falsas\n}\n```\n\n## Ejemplo: Calificaciones\n\n```java\nint calificacion = 85;\n\nif (calificacion >= 90) {\n    System.out.println(\"A - Excelente\");\n} else if (calificacion >= 80) {\n    System.out.println(\"B - Muy bien\");\n} else if (calificacion >= 70) {\n    System.out.println(\"C - Bien\");\n} else if (calificacion >= 60) {\n    System.out.println(\"D - Aprobado\");\n} else {\n    System.out.println(\"F - Reprobado\");\n}\n```\n\n## Consideraciones importantes\n\n- Las condiciones se evalúan en orden, de arriba hacia abajo.\n- La ejecución se detiene en la primera condición que es verdadera.\n- Si ninguna condición es verdadera, se ejecuta el bloque `else` (si existe).\n- El bloque `else` es opcional.\n- Organiza tus condiciones de manera lógica para evitar resultados inesperados.",
    order: 2,
    level: "Principiante",
    category: "Fundamentos"
  },
  {
    id: 3,
    title: "Operadores lógicos en condicionales",
    slug: "operadores-logicos",
    description: "Aprende a combinar condiciones usando operadores lógicos &&, || y ! en Java.",
    content: "# Operadores lógicos en condicionales\n\nEn programación, a menudo necesitamos combinar múltiples condiciones. Los operadores lógicos nos permiten hacer esto de forma eficiente.\n\n## Operadores lógicos en Java\n\nJava proporciona tres operadores lógicos principales:\n\n- **&&** (Y lógico): Verdadero solo si ambas condiciones son verdaderas.\n- **||** (O lógico): Verdadero si al menos una de las condiciones es verdadera.\n- **!** (NO lógico): Invierte el valor de la condición.\n\n## Ejemplos\n\n### Operador Y (&&)\n\n```java\nint edad = 25;\nboolean tieneLicencia = true;\n\nif (edad >= 18 && tieneLicencia) {\n    System.out.println(\"Puede conducir\");\n} else {\n    System.out.println(\"No puede conducir\");\n}\n```\n\n### Operador O (||)\n\n```java\nboolean tieneEfectivo = false;\nboolean tieneTarjeta = true;\n\nif (tieneEfectivo || tieneTarjeta) {\n    System.out.println(\"Puede realizar la compra\");\n} else {\n    System.out.println(\"No tiene método de pago disponible\");\n}\n```\n\n### Operador NO (!)\n\n```java\nboolean esFeriado = true;\n\nif (!esFeriado) {\n    System.out.println(\"Es día laborable\");\n} else {\n    System.out.println(\"Es día de descanso\");\n}\n```\n\n## Combinando operadores\n\n```java\nint edad = 20;\nboolean esEstudiante = true;\nboolean tieneDescuento = false;\n\nif ((edad < 18 || esEstudiante) && !tieneDescuento) {\n    System.out.println(\"Aplicar descuento especial\");\n}\n```\n\n## Orden de evaluación\n\nLos operadores lógicos se evalúan en el siguiente orden:\n1. ! (NO lógico)\n2. && (Y lógico)\n3. || (O lógico)\n\nUsa paréntesis para controlar el orden de evaluación cuando sea necesario.",
    order: 3,
    level: "Principiante",
    category: "Fundamentos"
  },
  {
    id: 4,
    title: "Switch-case en Java",
    slug: "switch-case",
    description: "Aprende a usar la estructura switch-case como alternativa a múltiples if-else.",
    content: "# Switch-case en Java\n\nLa estructura `switch` es una alternativa elegante a múltiples sentencias `if-else-if` cuando se trata de comparar una variable con varios valores posibles.\n\n## Sintaxis básica\n\n```java\nswitch (expresión) {\n    case valor1:\n        // código si expresión == valor1\n        break;\n    case valor2:\n        // código si expresión == valor2\n        break;\n    // más casos...\n    default:\n        // código si no coincide ningún caso\n}\n```\n\n## Ejemplo: Días de la semana\n\n```java\nint dia = 3;\nString nombreDia;\n\nswitch (dia) {\n    case 1:\n        nombreDia = \"Lunes\";\n        break;\n    case 2:\n        nombreDia = \"Martes\";\n        break;\n    case 3:\n        nombreDia = \"Miércoles\";\n        break;\n    case 4:\n        nombreDia = \"Jueves\";\n        break;\n    case 5:\n        nombreDia = \"Viernes\";\n        break;\n    case 6:\n        nombreDia = \"Sábado\";\n        break;\n    case 7:\n        nombreDia = \"Domingo\";\n        break;\n    default:\n        nombreDia = \"Día inválido\";\n}\n\nSystem.out.println(\"Hoy es \" + nombreDia);\n```\n\n## La palabra clave `break`\n\nLa palabra clave `break` es crucial en las sentencias `switch`. Sin ella, la ejecución continuará al siguiente caso, independientemente de si coincide o no. Esto se llama \"fall-through\" y puede ser útil en algunos casos, pero generalmente se considera un error.\n\n## El bloque `default`\n\nEl bloque `default` se ejecuta cuando ninguno de los casos coincide con la expresión evaluada. Es similar al bloque `else` final en una estructura `if-else-if`.\n\n## Tipos de datos permitidos\n\nLa expresión en un `switch` puede ser de tipo:\n- byte, short, char, int\n- enum\n- String (desde Java 7)\n- Byte, Short, Character, Integer (clases wrapper)\n\n## Switch mejorado (Java 14+)\n\nEn versiones recientes de Java, se han introducido mejoras al `switch` que permiten usarlo como expresión y simplificar la sintaxis:\n\n```java\nString nombreDia = switch (dia) {\n    case 1 -> \"Lunes\";\n    case 2 -> \"Martes\";\n    case 3 -> \"Miércoles\";\n    case 4 -> \"Jueves\";\n    case 5 -> \"Viernes\";\n    case 6 -> \"Sábado\";\n    case 7 -> \"Domingo\";\n    default -> \"Día inválido\";\n};\n```",
    order: 4,
    level: "Principiante",
    category: "Fundamentos"
  }
];

export const mockExercises: Exercise[] = [
  {
    id: 1,
    title: "Clasificación por edad",
    description: "Implementa un programa que clasifique a las personas según su edad en tres categorías.",
    instructions: "En este ejercicio, deberás implementar un programa que clasifica a las personas según su edad en tres categorías:\n\n- Menores de edad (menos de 18 años)\n- Adultos (entre 18 y 64 años)\n- Adultos mayores (65 años o más)\n\nPara completar este ejercicio necesitarás:\n1. Usar una estructura if-else if-else\n2. Realizar comparaciones con operadores relacionales (<, >, <=, >=)\n3. Utilizar System.out.println() para mostrar el resultado",
    startingCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.println(\"Ingresa la edad de la persona:\");\n        int edad = scanner.nextInt();\n        \n        // Escribe un condicional que imprima:\n        // \"Es menor de edad\" si la edad es menor a 18\n        // \"Es adulto\" si la edad está entre 18 y 64\n        // \"Es adulto mayor\" si la edad es 65 o mayor\n        \n        // Tu código aquí:\n        \n        \n        scanner.close();\n    }\n}",
    solutionCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.println(\"Ingresa la edad de la persona:\");\n        int edad = scanner.nextInt();\n        \n        // Escribe un condicional que imprima:\n        // \"Es menor de edad\" si la edad es menor a 18\n        // \"Es adulto\" si la edad está entre 18 y 64\n        // \"Es adulto mayor\" si la edad es 65 o mayor\n        \n        if (edad < 18) {\n            System.out.println(\"Es menor de edad\");\n        } else if (edad >= 65) {\n            System.out.println(\"Es adulto mayor\");\n        } else {\n            System.out.println(\"Es adulto\");\n        }\n        \n        scanner.close();\n    }\n}",
    hints: [
      "Primero verifica si la edad es menor que 18",
      "Luego verifica si la edad es mayor o igual que 65",
      "El caso restante debe ser para edades entre 18 y 64"
    ],
    lessonId: 1,
    testCases: [
      { input: "15", expected: "Es menor de edad" },
      { input: "35", expected: "Es adulto" },
      { input: "70", expected: "Es adulto mayor" }
    ],
    order: 1
  },
  {
    id: 2,
    title: "Clasificación de calificaciones",
    description: "Implementa un programa que clasifique calificaciones según una escala.",
    instructions: "En este ejercicio, deberás implementar un programa que clasifica calificaciones según la siguiente escala:\n\n- A: 90-100\n- B: 80-89\n- C: 70-79\n- D: 60-69\n- F: 0-59\n\nPara completar este ejercicio necesitarás:\n1. Usar una estructura if-else if-else con múltiples condiciones\n2. Manejar diferentes rangos de valores\n3. Utilizar System.out.println() para mostrar el resultado",
    startingCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.println(\"Ingresa la calificación (0-100):\");\n        int calificacion = scanner.nextInt();\n        \n        // Escribe un condicional que imprima la letra correspondiente a la calificación\n        // A: 90-100\n        // B: 80-89\n        // C: 70-79\n        // D: 60-69\n        // F: 0-59\n        // \"Calificación inválida\" para valores fuera del rango 0-100\n        \n        // Tu código aquí:\n        \n        \n        scanner.close();\n    }\n}",
    solutionCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.println(\"Ingresa la calificación (0-100):\");\n        int calificacion = scanner.nextInt();\n        \n        if (calificacion >= 0 && calificacion <= 100) {\n            if (calificacion >= 90) {\n                System.out.println(\"A\");\n            } else if (calificacion >= 80) {\n                System.out.println(\"B\");\n            } else if (calificacion >= 70) {\n                System.out.println(\"C\");\n            } else if (calificacion >= 60) {\n                System.out.println(\"D\");\n            } else {\n                System.out.println(\"F\");\n            }\n        } else {\n            System.out.println(\"Calificación inválida\");\n        }\n        \n        scanner.close();\n    }\n}",
    hints: [
      "Primero verifica si la calificación está en el rango válido (0-100)",
      "Organiza tus condiciones de mayor a menor para simplificar la lógica",
      "Recuerda manejar el caso de calificaciones inválidas"
    ],
    lessonId: 2,
    testCases: [
      { input: "95", expected: "A" },
      { input: "83", expected: "B" },
      { input: "75", expected: "C" },
      { input: "65", expected: "D" },
      { input: "45", expected: "F" },
      { input: "120", expected: "Calificación inválida" }
    ],
    order: 1
  }
];

/**
 * Helper function to get a lesson by its slug
 */
export function getMockLessonBySlug(slug: string): Lesson | undefined {
  return mockLessons.find(lesson => lesson.slug === slug);
}

/**
 * Helper function to get exercises for a lesson
 */
export function getMockExercisesForLesson(lessonId: number): Exercise[] {
  return mockExercises.filter(exercise => exercise.lessonId === lessonId);
}
