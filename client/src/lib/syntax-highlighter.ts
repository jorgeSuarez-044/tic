/**
 * Simple syntax highlighter for Java code
 * In a production app, you would likely use a library like Prism.js,
 * but this gives us more control for our specific needs
 */

// Token types with corresponding CSS classes
const TOKEN_TYPES = {
  KEYWORD: "token-keyword",
  STRING: "token-string",
  COMMENT: "token-comment",
  FUNCTION: "token-function",
  NUMBER: "token-number",
  OPERATOR: "token-operator",
  BOOLEAN: "token-boolean",
  TYPE: "token-type"
};

// Java keywords
const KEYWORDS = [
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", 
  "class", "const", "continue", "default", "do", "double", "else", "enum", 
  "extends", "final", "finally", "float", "for", "if", "goto", "implements", 
  "import", "instanceof", "int", "interface", "long", "native", "new", 
  "package", "private", "protected", "public", "return", "short", "static", 
  "strictfp", "super", "switch", "synchronized", "this", "throw", "throws", 
  "transient", "try", "void", "volatile", "while"
];

// Java primitive types and common classes
const TYPES = [
  "String", "System", "Scanner", "ArrayList", "List", "Map", "HashMap", 
  "Set", "HashSet", "Integer", "Double", "Boolean", "Character", "Byte",
  "Object", "Exception"
];

/**
 * Highlights Java code with HTML spans for CSS styling
 * @param code The Java code to highlight
 * @returns HTML string with syntax highlighting
 */
export function highlightJava(code: string): string {
  // Replace potentially unsafe characters
  code = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Replace patterns with highlighted spans
  return code
    // Comments
    .replace(/(\/\/.*)/g, `<span class="${TOKEN_TYPES.COMMENT}">$1</span>`)
    .replace(/\/\*[\s\S]*?\*\//g, (match) => `<span class="${TOKEN_TYPES.COMMENT}">${match}</span>`)
    
    // Strings
    .replace(/(["'])(.*?)\1/g, (match, quote, content) => 
      `<span class="${TOKEN_TYPES.STRING}">${quote}${content}${quote}</span>`)
    
    // Keywords
    .replace(new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g'), 
      `<span class="${TOKEN_TYPES.KEYWORD}">$1</span>`)
    
    // Types
    .replace(new RegExp(`\\b(${TYPES.join('|')})\\b`, 'g'), 
      `<span class="${TOKEN_TYPES.TYPE}">$1</span>`)
    
    // Booleans
    .replace(/\b(true|false|null)\b/g, `<span class="${TOKEN_TYPES.BOOLEAN}">$1</span>`)
    
    // Numbers (integer and floating point)
    .replace(/\b(\d+(\.\d+)?)\b/g, `<span class="${TOKEN_TYPES.NUMBER}">$1</span>`)
    
    // Function calls
    .replace(/(\w+)\s*\(/g, `<span class="${TOKEN_TYPES.FUNCTION}">$1</span>(`)
    
    // Operators
    .replace(/([=+\-*/%&|^~<>!?:;,.()[\]{}])/g, `<span class="${TOKEN_TYPES.OPERATOR}">$1</span>`);
}

/**
 * Formats line numbers for code blocks
 * @param code The code to format with line numbers
 * @returns HTML with line numbers
 */
export function addLineNumbers(code: string): string {
  const lines = code.split('\n');
  const numberedLines = lines.map((line, i) => 
    `<span class="line-number">${i + 1}</span>${line}`
  );
  return numberedLines.join('\n');
}
