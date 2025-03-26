import { apiRequest } from "./queryClient";

export interface VerificationResult {
  success: boolean;
  output: string;
  expected?: string;
  error?: string;
}

/**
 * Verifies Java code against an exercise
 * @param exerciseId - The ID of the exercise to verify
 * @param code - The user's code to verify
 * @param input - Optional user input for the program
 */
export async function verifyCode(
  exerciseId: number,
  code: string,
  input: string = ""
): Promise<VerificationResult> {
  try {
    const response = await apiRequest(
      "POST", 
      `/api/verify-exercise`,
      { exerciseId, code, input }
    );
    
    return await response.json();
  } catch (error) {
    console.error("Error verifying code:", error);
    return {
      success: false,
      output: "",
      error: error instanceof Error ? error.message : "Error desconocido al verificar el código"
    };
  }
}

/**
 * Simple Java syntax validation - not a full compiler,
 * just checks for common syntax errors
 */
export function validateJavaSyntax(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for mismatched braces
  const braces = code.match(/[{}]/g) || [];
  let braceCount = 0;
  
  for (const brace of braces) {
    if (brace === '{') braceCount++;
    else braceCount--;
    
    if (braceCount < 0) {
      errors.push("Error de sintaxis: Hay una llave de cierre '}' sin su correspondiente llave de apertura '{'");
      break;
    }
  }
  
  if (braceCount > 0) {
    errors.push(`Error de sintaxis: Faltan ${braceCount} llaves de cierre '}'`);
  }
  
  // Check for missing semicolons in statements (simple check)
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip comments, empty lines, and lines that shouldn't end with semicolons
    if (line.startsWith("//") || line === "" || line.endsWith("{") || 
        line.endsWith("}") || line.startsWith("import") ||
        line.startsWith("package") || line.startsWith("public class") ||
        line.startsWith("for") || line.startsWith("if") || 
        line.startsWith("else") || line.startsWith("while")) {
      continue;
    }
    
    if (!line.endsWith(";") && !line.endsWith("*/") && !line.startsWith("/*")) {
      errors.push(`Posible error en línea ${i + 1}: Falta punto y coma ';' al final de la instrucción`);
    }
  }
  
  // Check for common errors in if statements
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith("if")) {
      // Check for assignment instead of comparison
      if (line.includes("=") && !line.includes("==") && !line.includes("!=") && 
          !line.includes(">=") && !line.includes("<=")) {
        errors.push(`Posible error en línea ${i + 1}: Usando asignación '=' en lugar de comparación '==' en una condición if`);
      }
      
      // Check for missing parentheses in if condition
      if (!line.includes("(") || !line.includes(")")) {
        errors.push(`Error en línea ${i + 1}: Faltan paréntesis en la condición if`);
      }
    }
  }
  
  return { valid: errors.length === 0, errors };
}
