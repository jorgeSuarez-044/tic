import { useState } from "react";
import { AlertCircle, CheckCircle2, LightbulbIcon, Code } from "lucide-react";

interface ExerciseFeedbackProps {
  result: {
    success: boolean;
    error?: string;
    output?: string;
    expected?: string;
  };
  hints: string[];
}

const ExerciseFeedback = ({ result, hints }: ExerciseFeedbackProps) => {
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  
  const toggleHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else {
      // Cycle through hints
      setHintIndex((prev) => (prev + 1) % hints.length);
    }
  };

  return (
    <div>
      {result.success ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded p-3">
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">¡Correcto! Tu solución funciona correctamente.</p>
              <p className="text-sm mt-1">Has implementado correctamente la solución al ejercicio.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded p-3">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Tu solución aún no es correcta.</p>
              {result.error ? (
                <p className="text-sm mt-1">Error: {result.error}</p>
              ) : (
                <p className="text-sm mt-1">
                  Revisa que estés manejando todos los casos posibles con las condiciones adecuadas.
                </p>
              )}
              
              {hints.length > 0 && (
                <div className="mt-3">
                  <button 
                    className="text-xs underline hover:no-underline focus:outline-none flex items-center"
                    onClick={toggleHint}
                  >
                    <LightbulbIcon className="h-4 w-4 mr-1" />
                    {showHint ? "Ver otra pista" : "Ver una pista"}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {showHint && hints.length > 0 && (
            <div className="bg-gray-800 p-3 mt-2 rounded text-xs">
              <div className="flex items-start">
                <Code className="h-4 w-4 text-primary-300 mt-0.5 mr-2" />
                <span className="text-white">{hints[hintIndex]}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseFeedback;
