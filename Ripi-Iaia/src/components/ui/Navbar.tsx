import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Rádio/IPTV', path: '/radio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Hinários', path: '/biblioteca' },
  { name: 'Videoaulas', path: '/videoaulas' },
  { name: 'Landing Pages', path: '/live' },
  { name: 'Loja', path: '/loja' },
  { name: 'Contato', path: '/contato' },
];

const adminItems = [
  { name: 'Posts', path: '/admin/posts' },
  { name: 'Vídeos', path: '/admin/videos' },
  { name: 'Hinos', path: '/admin/hymns' },
  { name: 'Livros', path: '/admin/books' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md py-3 dark:bg-gray-950 dark:shadow-black/40'
          : 'bg-transparent py-5 dark:bg-gray-950/80',
        'dark:text-gray-200'
      )}
      style={{ minHeight: 68 }}
    >
      <div className="container-custom flex items-center justify-between min-h-[64px]">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-primary-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex items-center"
            onClick={closeMenu}
            style={{ minHeight: 48 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.jpeg`}
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full"
              style={{
                maxHeight: 48,
                maxWidth: 48,
                objectFit: 'contain',
                display: 'block',
                marginTop: 0,
                marginBottom: 0,
              }}
            />
            <span className="ml-2 text-xl font-display font-semibold text-primary-800">
              Universo Daime
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 dark:text-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                pathname === item.path
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated && userRole === 'admin' && (
            <div className="relative group">
              <button
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-700 hover:text-primary-600 hover:bg-primary-50 flex items-center"
                type="button"
              >
                Painel Admin
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Botão de alternância de tema */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full border border-primary-200 bg-primary-50 hover:bg-primary-100 transition-colors text-primary-700 dark:bg-gray-800 dark:text-emerald-300 dark:border-emerald-700"
          aria-label="Alternar tema claro/escuro"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>

        {/* Login/Account Button */}
        <div className="hidden md:block">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors duration-200"
            >
              Entrar
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button
                onClick={handleLogout}
                className="px-2 py-1 text-sm text-red-600 hover:text-red-800 underline"
              >
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'dark:bg-gray-950 dark:text-gray-200'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                to="/"
                className="flex items-center"
                onClick={closeMenu}
              >
                <img
                  src={`${import.meta.env.BASE_URL}logo.jpeg`}
                  alt="Logo"
                  className="h-10 w-10 object-contain rounded-full"
                />
                <span className="ml-2 text-lg font-semibold">Ripi Iaiá</span>
              </Link>
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'block px-3 py-4 text-base font-medium rounded-md transition-colors duration-200',
                        pathname === item.path
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {isAuthenticated && userRole === 'admin' && (
                  <>
                    <li className="mt-4 font-semibold text-primary-700">Painel Admin</li>
                    {adminItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={cn(
                            'block px-3 py-4 text-base font-medium rounded-md transition-colors duration-200',
                            pathname === item.path
                              ? 'text-primary-700 bg-primary-50'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                          )}
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </nav>

            <div className="p-4 border-t">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="block w-full py-3 px-4 text-center font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Entrar
                </Link>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                      <svg className="h-5 w-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 truncate max-w-[180px]">
                      {userEmail}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full py-2 px-4 text-center font-medium text-red-600 hover:text-red-800 underline"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;