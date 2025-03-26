import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Exercise } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "@/components/ui/code-editor";
import ExerciseInstructions from "./exercise-instructions";
import ExerciseFeedback from "./exercise-feedback";

interface CodeExerciseProps {
  exercise: Exercise;
  onComplete?: (success: boolean, score: number) => void;
}

const CodeExercise = ({ exercise, onComplete }: CodeExerciseProps) => {
  const [output, setOutput] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<{ 
    success: boolean;
    error?: string;
    output?: string;
    expected?: string;
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("editor");
  const [consoleInput, setConsoleInput] = useState<string>(""); // For simulating user input
  
  const handleRunCode = async (code: string) => {
    setOutput("Ejecutando código...");
    setVerificationResult(null);
    
    try {
      const result = await apiRequest("POST", `/api/exercises/${exercise.id}/verify`, {
        code,
        input: consoleInput
      });
      
      const data = await result.json();
      
      setVerificationResult(data);
      
      let outputText = "";
      if (exercise.testCases.length > 0 && consoleInput) {
        outputText += `Ingresa la edad de la persona:\n${consoleInput}\n`;
      }
      
      if (data.error) {
        outputText += `Error: ${data.error}`;
      } else {
        outputText += data.output || "Programa ejecutado correctamente";
      }
      
      setOutput(outputText);
      
      if (data.success && onComplete) {
        onComplete(true, 100);
      }
    } catch (error) {
      setOutput(`Error al ejecutar el código: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setVerificationResult({
        success: false,
        error: "Error de conexión con el servidor"
      });
    }
  };
  
  const handleReset = () => {
    setOutput("");
    setVerificationResult(null);
    setConsoleInput("");
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="sticky top-6">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b px-4 py-3">
            <h3 className="font-poppins font-semibold text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block h-5 w-5 text-primary-600 mr-2"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Practica los conceptos
            </h3>
          </div>

          {/* Tabs navigation */}
          <Tabs 
            defaultValue="editor" 
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <div className="bg-gray-800 text-gray-300 text-sm border-b border-gray-700">
              <TabsList className="bg-transparent border-b border-gray-700 h-10">
                <TabsTrigger 
                  value="editor"
                  className="data-[state=active]:bg-[#1e1e2e] data-[state=active]:text-white rounded-none border-r border-gray-700"
                >
                  Main.java
                </TabsTrigger>
                <TabsTrigger 
                  value="instructions"
                  className="data-[state=active]:bg-[#1e1e2e] data-[state=active]:text-white rounded-none"
                >
                  Instrucciones
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="bg-[#1e1e2e] m-0">
              {/* Code editor */}
              <div className="border-b border-gray-700">
                <CodeEditor 
                  initialCode={exercise.startingCode}
                  onRun={handleRunCode}
                  onReset={handleReset}
                  height="h-64"
                />
              </div>

              {/* Console input */}
              <div className="px-3 pt-3 pb-1 bg-gray-900">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                  >
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  Entrada:
                </div>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  placeholder="Escribe la entrada para el programa aquí..."
                  className="w-full font-mono text-sm text-gray-300 bg-black bg-opacity-50 rounded p-2 mb-2 border border-gray-700 focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Console output */}
              <div className="p-3 bg-gray-900">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                  >
                    <polyline points="9 10 4 15 9 20"></polyline>
                    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                  </svg>
                  Consola:
                </div>
                <div className="font-mono text-sm text-gray-300 bg-black bg-opacity-50 rounded p-3 h-32 overflow-y-auto whitespace-pre-line">
                  {output || "// El resultado de tu código aparecerá aquí..."}
                </div>
              </div>
              
              {/* Feedback area */}
              {verificationResult && (
                <div className="p-4 border-t border-gray-700">
                  <ExerciseFeedback 
                    result={verificationResult} 
                    hints={exercise.hints}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="instructions" className="p-5 bg-white m-0">
              <ExerciseInstructions 
                title={exercise.title}
                instructions={exercise.instructions}
                testCases={exercise.testCases}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Next exercises */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-poppins font-semibold text-gray-800">Próximos ejercicios</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Operadores lógicos con if-else</h4>
                <p className="text-sm text-gray-600 mt-1">Combina condiciones usando &&, || y !</p>
              </div>
              <span className="text-xs font-medium bg-primary-100 text-primary-700 rounded-full px-2 py-1">Siguiente</span>
            </div>
            <div className="p-4 hover:bg-gray-50 transition">
              <h4 className="font-medium text-gray-500">Switch-case en Java</h4>
              <p className="text-sm text-gray-500 mt-1">Alternativa a múltiples if-else</p>
            </div>
            <div className="p-4 hover:bg-gray-50 transition">
              <h4 className="font-medium text-gray-500">Operador ternario</h4>
              <p className="text-sm text-gray-500 mt-1">Forma concisa de escribir condicionales simples</p>
            </div>
          </div>
          <div className="p-3 bg-gray-50 text-center">
            <a href="#" className="text-sm text-primary-600 hover:text-primary-800 font-medium">Ver todo el plan de estudio</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExercise;
