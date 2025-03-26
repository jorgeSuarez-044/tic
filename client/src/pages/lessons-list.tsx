import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@shared/schema";
import { Link } from "wouter";
import { ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LessonsList = () => {
  const { data: lessons, isLoading, error } = useQuery<Lesson[]>({
    queryKey: ['/api/lessons'],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-4">Lecciones de Java: Condicionales</h1>
          <p className="text-gray-600">
            Explora nuestras lecciones interactivas sobre condicionales en Java, desde conceptos básicos hasta técnicas avanzadas.
          </p>
        </header>

        {isLoading ? (
          <div className="space-y-6">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <Skeleton className="h-10 w-40" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Error al cargar las lecciones</h3>
              <p className="text-gray-600 mb-4">
                No se pudieron obtener las lecciones. Por favor, intenta nuevamente.
              </p>
              <Button onClick={() => window.location.reload()}>
                Reintentar
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {lessons?.map((lesson) => (
              <Card key={lesson.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block">
                        {lesson.category}
                      </span>
                      <h2 className="text-xl font-poppins font-semibold mb-2">{lesson.title}</h2>
                      <p className="text-gray-600 mb-4">{lesson.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <span className="mr-4">Nivel: {lesson.level}</span>
                        <span>Lección {lesson.order}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Link href={`/lecciones/${lesson.slug}`}>
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Comenzar lección
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsList;
