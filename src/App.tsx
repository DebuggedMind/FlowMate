import { useState } from 'react';
import { Sun, Moon, Waves } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OpenChannelCalculator from './pages/OpenChannelCalculator';
import PipeNetworkAnalyzer from './pages/PipeNetworkAnalyzer';
import StormwaterCalculator from './pages/StormwaterCalculator';
import EducationalMode from './pages/EducationalMode';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'open-channel':
        return <OpenChannelCalculator />;
      case 'pipe-network':
        return <PipeNetworkAnalyzer />;
      case 'stormwater':
        return <StormwaterCalculator />;
      case 'educational':
        return <EducationalMode />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        darkMode={darkMode}
      >
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </Navbar>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;