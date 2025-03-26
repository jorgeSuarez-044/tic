import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Lesson, Exercise } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import LessonProgress from "@/components/lessons/lesson-progress";
import LessonContent from "@/components/lessons/lesson-content";
import CodeExercise from "@/components/exercises/code-exercise";
import VisualExplanation from "@/components/exercises/visual-explanation";

const LessonPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [progress, setProgress] = useState<number>(25);

  // Get the current lesson
  const { 
    data: lesson, 
    isLoading: isLoadingLesson, 
    error: lessonError 
  } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${slug}`],
  });

  // Get all lessons to determine next/previous
  const { 
    data: allLessons,
    isLoading: isLoadingAllLessons,
  } = useQuery<Lesson[]>({
    queryKey: ['/api/lessons'],
  });

  // Get exercises for this lesson
  const {
    data: exercises,
    isLoading: isLoadingExercises,
  } = useQuery<Exercise[]>({
    queryKey: [`/api/lessons/${lesson?.id}/exercises`],
    enabled: !!lesson?.id,
  });

  // Determine previous and next lessons
  const [previousLesson, setPreviousLesson] = useState<{ slug: string; title: string } | undefined>();
  const [nextLesson, setNextLesson] = useState<{ slug: string; title: string } | undefined>();

  useEffect(() => {
    if (allLessons && lesson) {
      const sortedLessons = [...allLessons].sort((a, b) => a.order - b.order);
      const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
      
      if (currentIndex > 0) {
        const prev = sortedLessons[currentIndex - 1];
        setPreviousLesson({ slug: prev.slug, title: prev.title });
      } else {
        setPreviousLesson(undefined);
      }
      
      if (currentIndex < sortedLessons.length - 1) {
        const next = sortedLessons[currentIndex + 1];
        setNextLesson({ slug: next.slug, title: next.title });
      } else {
        setNextLesson(undefined);
      }
    }
  }, [allLessons, lesson]);

  // Handle exercise completion
  const handleExerciseComplete = (success: boolean, score: number) => {
    if (success) {
      setProgress(prev => Math.min(100, prev + 25));
      
      // In a real app, save progress to the server
      // apiRequest("POST", "/api/user/progress", {
      //   lessonId: lesson?.id,
      //   exerciseId: exercises?.[0].id,
      //   completed: true,
      //   score
      // });
    }
  };

  // Loading state
  if (isLoadingLesson || isLoadingAllLessons) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center">
                <Skeleton className="w-64 h-2 mr-2" />
                <Skeleton className="w-8 h-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-[600px] rounded-lg" />
            </div>
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-[600px] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (lessonError || !lesson) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Lección no encontrada</h2>
        <p className="text-gray-600 mb-6">
          No pudimos encontrar la lección que estás buscando. Por favor, verifica la URL e intenta nuevamente.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LessonProgress 
        lesson={lesson} 
        totalLessons={allLessons?.length || 0}
        progress={progress}
      />
      
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <LessonContent 
            lesson={lesson}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
          />
          
          {isLoadingExercises ? (
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-[600px] rounded-lg" />
            </div>
          ) : exercises && exercises.length > 0 ? (
            <CodeExercise 
              exercise={exercises[0]} 
              onComplete={handleExerciseComplete}
            />
          ) : (
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-poppins font-semibold text-xl mb-4">Visualización del concepto</h3>
                
                {/* Visual explanation for if-else */}
                <VisualExplanation 
                  flowchartData={{
                    type: "if-else-if",
                    conditions: ["numero > 0", "numero < 0"],
                    actions: [
                      "El número es positivo",
                      "El número es negativo",
                      "El número es cero"
                    ]
                  }}
                />
                
                <p className="text-gray-700 mt-4">
                  Este diagrama muestra cómo funciona la estructura if-else-if. 
                  Primero se evalúa si el número es mayor que 0. Si es verdadero, 
                  se ejecuta el primer bloque. Si no, se comprueba si el número es menor que 0. 
                  Si esta segunda condición es verdadera, se ejecuta el segundo bloque. 
                  Si ninguna de las condiciones es verdadera, se ejecuta el bloque else.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
