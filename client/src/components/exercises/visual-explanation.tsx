import React from "react";

interface VisualExplanationProps {
  flowchartData: {
    type: "if" | "if-else" | "if-else-if";
    conditions: string[];
    actions: string[];
  };
}

const VisualExplanation = ({ flowchartData }: VisualExplanationProps) => {
  // Render a flowchart based on the condition type
  const renderFlowchart = () => {
    switch (flowchartData.type) {
      case "if":
        return renderIfFlowchart();
      case "if-else":
        return renderIfElseFlowchart();
      case "if-else-if":
        return renderIfElseIfFlowchart();
      default:
        return null;
    }
  };

  // Simple if flowchart
  const renderIfFlowchart = () => (
    <div className="flex flex-col items-center">
      <div className="w-40 h-12 flex items-center justify-center bg-primary-100 border border-primary-300 rounded-md text-primary-800 font-medium text-sm px-2 text-center">
        ¿{flowchartData.conditions[0]}?
      </div>
      <div className="h-6 w-0.5 bg-gray-400"></div>
      <div className="flex items-start space-x-16">
        <div className="flex flex-col items-center">
          <div className="text-green-600 font-medium text-xs">Sí</div>
          <div className="h-6 w-0.5 bg-green-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-green-50 border border-green-200 rounded-md text-green-800 text-sm px-2 text-center">
            {flowchartData.actions[0]}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-red-600 font-medium text-xs">No</div>
          <div className="h-6 w-0.5 bg-red-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md text-gray-500 text-sm px-2 text-center">
            No hace nada
          </div>
        </div>
      </div>
    </div>
  );

  // If-else flowchart
  const renderIfElseFlowchart = () => (
    <div className="flex flex-col items-center">
      <div className="w-40 h-12 flex items-center justify-center bg-primary-100 border border-primary-300 rounded-md text-primary-800 font-medium text-sm px-2 text-center">
        ¿{flowchartData.conditions[0]}?
      </div>
      <div className="h-6 w-0.5 bg-gray-400"></div>
      <div className="flex items-start space-x-16">
        <div className="flex flex-col items-center">
          <div className="text-green-600 font-medium text-xs">Sí</div>
          <div className="h-6 w-0.5 bg-green-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-green-50 border border-green-200 rounded-md text-green-800 text-sm px-2 text-center">
            {flowchartData.actions[0]}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-red-600 font-medium text-xs">No</div>
          <div className="h-6 w-0.5 bg-red-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm px-2 text-center">
            {flowchartData.actions[1]}
          </div>
        </div>
      </div>
    </div>
  );

  // If-else-if flowchart
  const renderIfElseIfFlowchart = () => (
    <div className="flex flex-col items-center">
      <div className="w-40 h-12 flex items-center justify-center bg-primary-100 border border-primary-300 rounded-md text-primary-800 font-medium text-sm px-2 text-center">
        ¿{flowchartData.conditions[0]}?
      </div>
      <div className="h-6 w-0.5 bg-gray-400"></div>
      <div className="flex items-start space-x-16">
        <div className="flex flex-col items-center">
          <div className="text-green-600 font-medium text-xs">Sí</div>
          <div className="h-6 w-0.5 bg-green-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-green-50 border border-green-200 rounded-md text-green-800 text-sm px-2 text-center">
            {flowchartData.actions[0]}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-red-600 font-medium text-xs">No</div>
          <div className="h-6 w-0.5 bg-red-600"></div>
          <div className="w-40 h-12 flex items-center justify-center bg-orange-50 border border-orange-200 rounded-md text-orange-800 font-medium text-sm px-2 text-center">
            ¿{flowchartData.conditions[1]}?
          </div>
          <div className="h-6 w-0.5 bg-gray-400"></div>
          <div className="flex items-start space-x-12">
            <div className="flex flex-col items-center">
              <div className="text-green-600 font-medium text-xs">Sí</div>
              <div className="h-6 w-0.5 bg-green-600"></div>
              <div className="w-36 px-2 h-12 flex items-center justify-center bg-orange-50 border border-orange-200 rounded-md text-orange-700 text-sm text-center">
                {flowchartData.actions[1]}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-red-600 font-medium text-xs">No</div>
              <div className="h-6 w-0.5 bg-red-600"></div>
              <div className="w-36 px-2 h-12 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm text-center">
                {flowchartData.actions[2]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
      <h5 className="font-medium text-base mb-2 text-gray-800">Flujo de ejecución:</h5>
      <div className="flex flex-col items-center space-y-3">
        {renderFlowchart()}
      </div>
    </div>
  );
};

export default VisualExplanation;
