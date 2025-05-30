import { FC, ReactNode } from 'react';
import { X } from 'lucide-react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ title, children, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative border border-blue-100 dark:border-blue-900">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <X size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{title}</h3>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;