import { Card } from "@/components/ui/card";

interface ExerciseInstructionsProps {
  title: string;
  instructions: string;
  testCases: { input: string; expected: string }[];
}

const ExerciseInstructions = ({ title, instructions, testCases }: ExerciseInstructionsProps) => {
  // Convert markdown-like instructions to formatted content
  const formatInstructions = (text: string) => {
    // Split by double newlines to get paragraphs
    return text.split('\n\n').map((paragraph, idx) => {
      // Handle lists
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const items = paragraph.split('\n').map(item => item.substring(2));
        return (
          <ul key={idx} className="list-disc pl-5 space-y-1 mb-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
      }
      
      // Handle numbered lists
      if (paragraph.match(/^\d+\. /)) {
        const items = paragraph.split('\n').map(item => {
          const match = item.match(/^(\d+)\. (.*)/);
          return match ? match[2] : item;
        });
        return (
          <ol key={idx} className="list-decimal pl-5 space-y-1 mb-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700">{item}</li>
            ))}
          </ol>
        );
      }
      
      // Regular paragraph
      return <p key={idx} className="text-gray-700 mb-4">{paragraph}</p>;
    });
  };

  return (
    <div>
      <h4 className="font-poppins font-semibold text-lg text-gray-800 mb-3">{title}</h4>
      
      <div className="prose prose-sm text-gray-700">
        {formatInstructions(instructions)}
      </div>
      
      <div className="mt-5">
        <h5 className="font-medium text-gray-800 mb-2">Ejemplos:</h5>
        <div className="space-y-3">
          {testCases.map((testCase, index) => (
            <div key={index} className="bg-gray-50 rounded p-3 text-sm">
              <div className="text-gray-600 mb-1">Entrada:</div>
              <div className="font-mono">{testCase.input}</div>
              <div className="text-gray-600 mt-2 mb-1">Salida esperada:</div>
              <div className="font-mono">{testCase.expected}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseInstructions;
