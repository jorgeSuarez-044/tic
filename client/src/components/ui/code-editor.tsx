import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  initialCode: string;
  onRun: (code: string) => void;
  onReset?: () => void;
  height?: string;
}

const CodeEditor = ({ initialCode, onRun, onReset, height = "h-64" }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      // Insert 4 spaces for a tab
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 4;
          textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleRun = () => {
    onRun(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    if (onReset) onReset();
  };

  return (
    <div className="bg-[#1e1e2e] rounded-md overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-white text-sm font-medium">Editor de Código</span>
        <div className="flex space-x-2">
          <button 
            className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition"
            onClick={handleReset}
          >
            <RotateCcw className="inline-block mr-1 h-3 w-3" />
            Reiniciar
          </button>
          <button 
            className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded transition"
            onClick={handleRun}
          >
            <Play className="inline-block mr-1 h-3 w-3" />
            Ejecutar
          </button>
        </div>
      </div>
      
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`w-full ${height} font-mono bg-[#1e1e2e] text-white p-4 focus:outline-none resize-none`}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
