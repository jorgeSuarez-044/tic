import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@shared/schema";

interface LessonProgressProps {
  lesson: Lesson;
  totalLessons: number;
  progress?: number;
}

const LessonProgress = ({ lesson, totalLessons, progress = 25 }: LessonProgressProps) => {
  // In a real app, this would fetch the user's progress for this specific lesson
  const { data: userProgress } = useQuery({
    queryKey: ['/api/user/progress'],
    enabled: false, // Disabled for now as we're using mock data
  });

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h2 className="font-poppins font-semibold text-lg text-primary-700">{lesson.title}</h2>
            <p className="text-sm text-gray-600">
              Lección {lesson.order} de {totalLessons} • Nivel: {lesson.level}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center">
            <div className="w-full sm:w-64 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonProgress;
