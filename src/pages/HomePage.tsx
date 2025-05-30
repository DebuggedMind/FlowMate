import { FC } from 'react';
import { ArrowRight, Activity, Droplet, CloudRain, BookOpen } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: FC<HomePageProps> = ({ setCurrentPage }) => {
  const features = [
    {
      id: 'open-channel',
      title: 'Open Channel Flow',
      description: 'Calculate flow parameters using Manning\'s equation, critical depth, and slope analysis.',
      icon: <Droplet className="h-10 w-10 text-blue-600" />,
    },
    {
      id: 'pipe-network',
      title: 'Pipe Network Analyzer',
      description: 'Analyze complex pipe networks, calculate pressure drops, and optimize system design.',
      icon: <Activity className="h-10 w-10 text-blue-600" />,
    },
    {
      id: 'stormwater',
      title: 'Stormwater Runoff',
      description: 'Estimate runoff using the SCS-CN method with interactive visual feedback.',
      icon: <CloudRain className="h-10 w-10 text-blue-600" />,
    },
    {
      id: 'educational',
      title: 'Educational Mode',
      description: 'Learn hydraulic concepts through guided examples ideal for GATE preparation.',
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 opacity-10 animate-pulse"></div>
        <div className="relative max-w-4xl mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Streamline Your Hydraulic Analysis
          </h1>
          <p className="text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300">
            Interactive tools for civil engineers to simulate and analyze open-channel flow,
            pipe networks, and stormwater systems — all in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentPage('open-channel')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Try Open Channel Calculator <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage('educational')}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Explore Educational Mode
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Analysis Tools</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Our suite of hydraulic and hydrologic tools helps you solve complex engineering problems with ease.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                onClick={() => setCurrentPage(feature.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Engineers Love FlowMate</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Engineering Student</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">University of Engineering</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "FlowMate has completely changed how I approach hydraulic problems. The visual feedback helps me understand concepts that were difficult to grasp from textbooks alone."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex justify-between items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to simplify your hydraulic calculations?
                </h3>
                <p className="text-blue-100 md:max-w-lg">
                  Start using our interactive tools today and experience the difference in your workflow.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setCurrentPage('open-channel')}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;