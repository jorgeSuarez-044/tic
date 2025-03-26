import { Link } from "wouter";
import { CodeSquare, Github, Twitter, Youtube, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <CodeSquare className="h-6 w-6 text-primary-600" />
              <h2 className="font-poppins font-bold text-lg text-gray-800">JavaCondicionales</h2>
            </div>
            <p className="text-sm text-gray-600 mt-2 max-w-md">
              Plataforma interactiva para aprender programación en Java con enfoque en estructuras condicionales.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Plataforma</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-600 hover:text-primary-600">Inicio</a></Link></li>
                <li><Link href="/lecciones"><a className="text-gray-600 hover:text-primary-600">Lecciones</a></Link></li>
                <li><Link href="/lecciones/condicionales-if-else"><a className="text-gray-600 hover:text-primary-600">Ejercicios</a></Link></li>
                <li><Link href="/lecciones"><a className="text-gray-600 hover:text-primary-600">Blog</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Guía de Java</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Documentación</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Foro de ayuda</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Proyectos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Soporte</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Acerca de</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Política de privacidad</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Términos de uso</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2">&copy; {new Date().getFullYear()} JavaCondicionales. Desarrollado por Jorge Leonardo Suarez Cortes.</p>
          <p className="text-sm text-gray-500 mb-4">Proyecto para la materia de Fundamentos TecnoPedagógicos de la Educación en Línea.</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-500 hover:text-primary-600"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-gray-500 hover:text-primary-600"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-500 hover:text-primary-600"><Youtube className="h-5 w-5" /></a>
            <a href="#" className="text-gray-500 hover:text-primary-600"><MessageSquare className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
