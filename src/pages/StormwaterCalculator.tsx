import { FC, useState } from 'react';
import { Calculator, Download, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CalculatorInput from '../components/CalculatorInput';
import ResultDisplay from '../components/ResultDisplay';
import InfoCard from '../components/InfoCard';

interface LandUseOption {
  label: string;
  cn: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

const landUseOptions: LandUseOption[] = [
  {
    label: 'Fully developed urban areas (vegetation established)',
    cn: { a: 77, b: 85, c: 90, d: 92 }
  },
  {
    label: 'Natural forest land',
    cn: { a: 36, b: 60, c: 73, d: 79 }
  },
  {
    label: 'Agricultural land',
    cn: { a: 67, b: 76, c: 83, d: 86 }
  },
  {
    label: 'Industrial districts',
    cn: { a: 81, b: 88, c: 91, d: 93 }
  },
  {
    label: 'Residential areas',
    cn: { a: 61, b: 75, c: 83, d: 87 }
  }
];

const StormwaterCalculator: FC = () => {
  const [inputs, setInputs] = useState({
    rainfallDepth: 100, // mm
    area: 10, // hectares
    landUseIndex: 0,
    soilGroup: 'b' as 'a' | 'b' | 'c' | 'd'
  });

  const [showHelp, setShowHelp] = useState(false);
  const [results, setResults] = useState({
    runoffDepth: 0,
    runoffVolume: 0,
    retentionParameter: 0,
    initialAbstraction: 0
  });

  const calculateRunoff = () => {
    const cn = landUseOptions[inputs.landUseIndex].cn[inputs.soilGroup];
    const s = (25400 / cn) - 254; // Retention parameter (mm)
    const ia = 0.2 * s; // Initial abstraction (mm)
    const p = inputs.rainfallDepth; // Rainfall depth (mm)
    
    let q = 0; // Runoff depth (mm)
    if (p > ia) {
      q = Math.pow(p - ia, 2) / (p - ia + s);
    }
    
    const volume = (q * inputs.area * 10); // Runoff volume in cubic meters

    setResults({
      runoffDepth: q,
      runoffVolume: volume,
      retentionParameter: s,
      initialAbstraction: ia
    });
  };

  const exportResults = () => {
    const data = {
      inputs,
      results,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stormwater-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const comparisonData = landUseOptions.map(option => ({
    name: option.label.split('(')[0].trim(),
    cn: option.cn[inputs.soilGroup],
    runoff: option.cn[inputs.soilGroup] > 0 
      ? Math.pow(inputs.rainfallDepth - 0.2 * ((25400 / option.cn[inputs.soilGroup]) - 254), 2) 
        / (inputs.rainfallDepth - 0.2 * ((25400 / option.cn[inputs.soilGroup]) - 254) + ((25400 / option.cn[inputs.soilGroup]) - 254))
      : 0
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stormwater Runoff Estimator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate runoff volume using the SCS Curve Number method.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Input Parameters</h2>
              <button 
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <CalculatorInput 
                label="Rainfall Depth"
                name="rainfallDepth"
                value={inputs.rainfallDepth}
                min={0}
                max={500}
                step={1}
                unit="mm"
                onChange={(value) => setInputs(prev => ({ ...prev, rainfallDepth: value }))}
              />
              
              <CalculatorInput 
                label="Catchment Area"
                name="area"
                value={inputs.area}
                min={0.1}
                max={1000}
                step={0.1}
                unit="ha"
                onChange={(value) => setInputs(prev => ({ ...prev, area: value }))}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Land Use Type
                </label>
                <select
                  value={inputs.landUseIndex}
                  onChange={(e) => setInputs(prev => ({ ...prev, landUseIndex: parseInt(e.target.value) }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
                >
                  {landUseOptions.map((option, index) => (
                    <option key={index} value={index}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hydrologic Soil Group
                </label>
                <select
                  value={inputs.soilGroup}
                  onChange={(e) => setInputs(prev => ({ ...prev, soilGroup: e.target.value as 'a' | 'b' | 'c' | 'd' }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="a">Group A - High Infiltration</option>
                  <option value="b">Group B - Moderate Infiltration</option>
                  <option value="c">Group C - Slow Infiltration</option>
                  <option value="d">Group D - Very Slow Infiltration</option>
                </select>
              </div>
            </div>

            <button 
              onClick={calculateRunoff}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center mt-6"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Runoff
            </button>
          </div>

          {showHelp && (
            <InfoCard 
              title="About SCS-CN Method"
              onClose={() => setShowHelp(false)}
            >
              <p className="mb-4">
                The SCS Curve Number method is used to estimate direct runoff from rainfall events:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4 font-mono text-center">
                Q = (P - Ia)² / (P - Ia + S)
              </div>
              <p className="mb-2">Where:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Q = Runoff depth (mm)</li>
                <li>P = Rainfall depth (mm)</li>
                <li>Ia = Initial abstraction (mm)</li>
                <li>S = Retention parameter (mm)</li>
                <li>CN = Curve number</li>
              </ul>
            </InfoCard>
          )}
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Results</h2>
              <button 
                onClick={exportResults}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Download size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <ResultDisplay 
                label="Runoff Depth"
                value={results.runoffDepth.toFixed(2)}
                unit="mm"
              />
              <ResultDisplay 
                label="Runoff Volume"
                value={results.runoffVolume.toFixed(2)}
                unit="m³"
              />
              <ResultDisplay 
                label="Retention Parameter"
                value={results.retentionParameter.toFixed(2)}
                unit="mm"
              />
              <ResultDisplay 
                label="Initial Abstraction"
                value={results.initialAbstraction.toFixed(2)}
                unit="mm"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-4">Land Use Comparison</h3>
              <BarChart
                width={500}
                height={300}
                data={comparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Runoff (mm)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="runoff" fill="#3B82F6" name="Runoff Depth" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StormwaterCalculator;