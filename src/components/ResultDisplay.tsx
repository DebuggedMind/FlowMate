import { FC } from 'react';

interface ResultDisplayProps {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

const ResultDisplay: FC<ResultDisplayProps> = ({ 
  label, 
  value, 
  unit, 
  highlight = false,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700 dark:text-gray-300">{label}:</span>
      <div className="flex items-center">
        {highlight ? (
          <span className={`font-medium px-2 py-1 rounded ${colorClasses[color]}`}>
            {value}
          </span>
        ) : (
          <span className="font-medium">
            {value} <span className="text-gray-500 dark:text-gray-400">{unit}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;