import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
}

const CodePreview = ({ code, language = "java", title = "Ejemplo" }: CodePreviewProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = useCopyToClipboard();
  
  const handleCopy = async () => {
    await copyToClipboard(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Function to highlight Java syntax
  const highlightJava = (code: string) => {
    // Very simple syntax highlighting for demo purposes
    // In a real app, we would use a library like Prism.js or highlight.js
    return code
      .replace(/(\/\/.*)/g, '<span class="token comment">$1</span>')
      .replace(/\b(public|private|protected|class|static|void|int|double|boolean|String|if|else|for|while|return|true|false|new|null|import|package|extends|implements|interface|abstract|final|try|catch|throw|throws|this|super)\b/g, '<span class="token keyword">$1</span>')
      .replace(/(["'])(.*?)\1/g, '<span class="token string">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token number">$1</span>')
      .replace(/(\(|\)|\{|\}|\[|\]|;|,|\.|=|>|<|\+|-|\*|\/|%|!|&|\||\?|:|==|!=|>=|<=|&&|\|\||null)/g, '<span class="token operator">$1</span>');
  };

  const highlightedCode = language === "java" ? highlightJava(code) : code;

  return (
    <div className="bg-[#1e1e2e] rounded-md overflow-hidden mb-4">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-white text-sm font-medium">{title}</span>
        <button 
          className="text-gray-400 hover:text-white focus:outline-none text-sm"
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              <Check className="inline-block mr-1 h-4 w-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="inline-block mr-1 h-4 w-4" />
              Copiar
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-white overflow-x-auto">
        <code 
          className="font-mono text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default CodePreview;
