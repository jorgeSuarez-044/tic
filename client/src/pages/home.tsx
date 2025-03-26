import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@shared/schema";
import { ArrowRight, BookOpen, Award, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: lessons, isLoading, error } = useQuery<Lesson[]>({
    queryKey: ['/api/lessons'],
  });

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              Domina las Condicionales en Java de forma Interactiva
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Aprende a programar estructuras condicionales en Java con ejemplos prácticos y ejercicios interactivos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary-500 hover:bg-secondary-600 text-black"
              >
                <Link href="/lecciones">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Comenzar a aprender
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-700"
              >
                <Link href="/lecciones/condicionales-if-else">
                  <div className="flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Ir a ejercicios
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12">
            ¿Por qué aprender con nosotros?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Code className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-3">Código interactivo</h3>
              <p className="text-gray-600">
                Escribe, edita y ejecuta código Java directamente en tu navegador, con verificación en tiempo real.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Lightbulb className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-3">Explicaciones visuales</h3>
              <p className="text-gray-600">
                Comprende los conceptos clave con diagramas de flujo y explicaciones paso a paso.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Award className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-3">Progreso y logros</h3>
              <p className="text-gray-600">
                Realiza un seguimiento de tu avance y obtén reconocimiento a medida que dominas cada concepto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest lessons section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-poppins font-bold">Lecciones disponibles</h2>
            <Link href="/lecciones">
              <a className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                Ver todas las lecciones
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <div className="p-5">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-6 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="p-4 bg-gray-50 border-t">
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-red-600">Error al cargar las lecciones. Por favor, intenta nuevamente.</p>
              </div>
            ) : (
              lessons?.slice(0, 3).map((lesson) => (
                <Card key={lesson.id}>
                  <CardContent className="p-0">
                    <div className="p-5">
                      <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block">
                        {lesson.category}
                      </span>
                      <h3 className="font-poppins font-semibold text-lg mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                      <p className="text-sm text-gray-500">Nivel: {lesson.level}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border-t">
                      <Button asChild className="w-full">
                        <Link href={`/lecciones/${lesson.slug}`}>
                          <div className="flex items-center justify-center">
                            Comenzar lección
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Comienza tu viaje para dominar las condicionales en Java hoy mismo. Es gratis y 100% interactivo.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Link href="/lecciones">
              <div className="flex items-center">
                Explorar lecciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
