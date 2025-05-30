import { FC, ReactNode } from 'react';
import { Droplet } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  children?: ReactNode;
}

const Navbar: FC<NavbarProps> = ({ currentPage, setCurrentPage, darkMode, children }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'open-channel', label: 'Open Channel Flow' },
    { id: 'pipe-network', label: 'Pipe Networks' },
    { id: 'stormwater', label: 'Stormwater Runoff' },
    { id: 'educational', label: 'Educational Mode' },
  ];

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Droplet className="text-blue-600 dark:text-blue-400" size={32} />
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold tracking-tight"
            >
              Flow<span className="text-blue-600 dark:text-blue-400">Mate</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  currentPage === item.id 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            {children}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <div className="mr-2">{children}</div>
            <div className="relative group">
              <button 
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Menu"
              >
                <div className="w-5 h-0.5 bg-current mb-1"></div>
                <div className="w-5 h-0.5 bg-current mb-1"></div>
                <div className="w-5 h-0.5 bg-current"></div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      currentPage === item.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;