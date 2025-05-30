import { FC, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-8">
        <div className="mb-5">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
          <span>Try it now</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;