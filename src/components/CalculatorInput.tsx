import { FC, useState, ChangeEvent } from 'react';

interface CalculatorInputProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

const CalculatorInput: FC<CalculatorInputProps> = ({
  label,
  name,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {value} {unit}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
          }}
        />
        <div 
          className={`absolute h-4 w-4 bg-blue-600 rounded-full -mt-1 transform -translate-y-1/2 transition-all ${
            focused ? 'scale-125' : ''
          }`}
          style={{ 
            left: `calc(${percentage}% - ${percentage * 0.08}px)`,
            top: '50%',
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
};

export default CalculatorInput;