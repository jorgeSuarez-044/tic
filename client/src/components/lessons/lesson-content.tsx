import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Bookmark, Share, AlertTriangle, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@shared/schema";
import CodePreview from "@/components/ui/code-preview";

interface LessonContentProps {
  lesson: Lesson;
  previousLesson?: { slug: string; title: string };
  nextLesson?: { slug: string; title: string };
}

const LessonContent = ({ lesson, previousLesson, nextLesson }: LessonContentProps) => {
  // Parse markdown content - in a real app we'd use a full markdown parser
  // For this demo, we'll just do simple replacements for headers, code blocks, and paragraphs
  const processContent = (content: string) => {
    const sections = content.split('\n\n## ');
    
    if (sections.length === 1) {
      // No section headers
      return processSection(content);
    }
    
    const firstSection = sections[0].startsWith('# ') 
      ? processSection(sections[0]) 
      : <div key="intro">{processSection(sections[0])}</div>;
    
    const restSections = sections.slice(1).map((section, index) => {
      const [title, ...content] = section.split('\n\n');
      return (
        <section key={index} className="mt-8">
          <h4 className="font-poppins font-semibold text-lg text-primary-700 mb-3">{title}</h4>
          {processSection(content.join('\n\n'))}
        </section>
      );
    });
    
    return [firstSection, ...restSections];
  };
  
  const processSection = (content: string) => {
    // Replace code blocks
    const parts = content.split('```');
    if (parts.length === 1) {
      return processParagraphs(content);
    }
    
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        result.push(processParagraphs(parts[i]));
      } else {
        const [language, ...code] = parts[i].split('\n');
        result.push(
          <div key={`code-${i}`} className="mb-4">
            <CodePreview 
              language={language} 
              code={code.join('\n')} 
              title="Ejemplo" 
            />
          </div>
        );
      }
    }
    return result;
  };
  
  const processParagraphs = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return <h3 key={index} className="font-poppins font-bold text-xl text-gray-800 mb-4">{paragraph.substring(2)}</h3>;
      }
      
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.substring(2));
        return (
          <ul key={index} className="list-disc pl-5 space-y-2 mb-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700">{processInlineCode(item)}</li>
            ))}
          </ul>
        );
      }
      
      return <p key={index} className="text-gray-700 mb-4">{processInlineCode(paragraph)}</p>;
    });
  };
  
  const processInlineCode = (text: string) => {
    const parts = text.split('`');
    if (parts.length === 1) return text;
    
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        result.push(parts[i]);
      } else {
        result.push(
          <code key={i} className="font-mono bg-gray-100 px-1 py-0.5 rounded text-primary-700">
            {parts[i]}
          </code>
        );
      }
    }
    return result;
  };

  return (
    <div className="w-full lg:w-1/2">
      <Card>
        <CardContent className="p-6">
          {/* Lesson title and description */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {lesson.category}
              </span>
              <div className="ml-auto flex">
                <button className="text-gray-500 hover:text-primary-600 p-1" title="Guardar para más tarde">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-primary-600 p-1 ml-2" title="Compartir lección">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
            <h3 className="font-poppins font-bold text-xl text-gray-800">{lesson.title}</h3>
            <p className="text-gray-600 mt-2">{lesson.description}</p>
          </div>

          {/* Lesson content */}
          <div className="space-y-8">
            {processContent(lesson.content)}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {previousLesson ? (
              <Link href={`/lecciones/${previousLesson.slug}`}>
                <a className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-700">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Anterior: {previousLesson.title}
                </a>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextLesson && (
              <Link href={`/lecciones/${nextLesson.slug}`}>
                <a className="flex items-center text-sm font-medium text-primary-700 hover:text-primary-800">
                  Siguiente: {nextLesson.title}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonContent;
