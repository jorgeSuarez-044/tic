import { useState } from "react";
import { Link, useLocation } from "wouter";
import { CodeSquare } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CodeSquare className="h-6 w-6 text-secondary-400" />
          <Link href="/">
            <a className="font-poppins font-bold text-xl">JavaCondicionales</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={`font-medium transition ${isActive('/') ? 'text-secondary-300' : 'hover:text-secondary-300'}`}>
              Inicio
            </a>
          </Link>
          <Link href="/lecciones">
            <a className={`font-medium transition ${isActive('/lecciones') ? 'text-secondary-300' : 'hover:text-secondary-300'}`}>
              Lecciones
            </a>
          </Link>
          <Link href="/lecciones/condicionales-if-else">
            <a className={`font-medium transition ${location.includes('/lecciones/condicionales-if-else') ? 'text-secondary-300' : 'hover:text-secondary-300'}`}>
              Ejercicios
            </a>
          </Link>
          <Link href="/lecciones">
            <a className="font-medium hover:text-secondary-300 transition">
              Guía
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm">
            <span className="mr-1">👤</span>Estudiante
          </span>
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-700 p-4">
          <div className="flex flex-col space-y-3">
            <Link href="/">
              <a className="text-white font-medium py-1">Inicio</a>
            </Link>
            <Link href="/lecciones">
              <a className="text-white font-medium py-1">Lecciones</a>
            </Link>
            <Link href="/lecciones/condicionales-if-else">
              <a className="text-white font-medium py-1">Ejercicios</a>
            </Link>
            <Link href="/lecciones">
              <a className="text-white font-medium py-1">Guía</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
