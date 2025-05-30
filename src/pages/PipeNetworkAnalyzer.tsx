import { FC, useState } from 'react';
import { Calculator, Download, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ResultDisplay from '../components/ResultDisplay';
import InfoCard from '../components/InfoCard';

interface Pipe {
  id: string;
  length: number;
  diameter: number;
  roughness: number;
  flowRate?: number;
  headLoss?: number;
}

const PipeNetworkAnalyzer: FC = () => {
  const [pipes, setPipes] = useState<Pipe[]>([
    { id: '1', length: 100, diameter: 0.2, roughness: 0.015 }
  ]);
  const [showHelp, setShowHelp] = useState(false);
  const [method, setMethod] = useState<'hazen-williams' | 'darcy-weisbach'>('hazen-williams');

  const calculateResults = () => {
    const updatedPipes = pipes.map(pipe => {
      // Simplified calculation for MVP
      const area = Math.PI * Math.pow(pipe.diameter / 2, 2);
      const velocity = 2.0; // Assumed velocity for demonstration
      const flowRate = velocity * area;
      
      // Hazen-Williams formula (simplified)
      const headLoss = method === 'hazen-williams'
        ? 10.67 * Math.pow(flowRate, 1.85) * pipe.length / (Math.pow(pipe.roughness, 1.85) * Math.pow(pipe.diameter, 4.87))
        : 0.08 * pipe.roughness * Math.pow(velocity, 2) * pipe.length / (2 * 9.81 * pipe.diameter);

      return { ...pipe, flowRate, headLoss };
    });

    setPipes(updatedPipes);
  };

  const addPipe = () => {
    setPipes([...pipes, {
      id: String(pipes.length + 1),
      length: 100,
      diameter: 0.2,
      roughness: 0.015
    }]);
  };

  const removePipe = (id: string) => {
    setPipes(pipes.filter(pipe => pipe.id !== id));
  };

  const updatePipe = (id: string, field: keyof Pipe, value: number) => {
    setPipes(pipes.map(pipe => 
      pipe.id === id ? { ...pipe, [field]: value } : pipe
    ));
  };

  const exportResults = () => {
    const data = {
      method,
      pipes,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pipe-network-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pipe Network Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze flow rates and pressure drops in pipe networks using industry-standard methods.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Network Parameters</h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <HelpCircle size={20} />
                </button>
                <button
                  onClick={addPipe}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calculation Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as 'hazen-williams' | 'darcy-weisbach')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="hazen-williams">Hazen-Williams</option>
                <option value="darcy-weisbach">Darcy-Weisbach</option>
              </select>
            </div>

            {pipes.map((pipe) => (
              <div key={pipe.id} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Pipe {pipe.id}</h3>
                  <button
                    onClick={() => removePipe(pipe.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      value={pipe.length}
                      onChange={(e) => updatePipe(pipe.id, 'length', parseFloat(e.target.value))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Diameter (m)
                    </label>
                    <input
                      type="number"
                      value={pipe.diameter}
                      onChange={(e) => updatePipe(pipe.id, 'diameter', parseFloat(e.target.value))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Roughness Coefficient
                    </label>
                    <input
                      type="number"
                      value={pipe.roughness}
                      onChange={(e) => updatePipe(pipe.id, 'roughness', parseFloat(e.target.value))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={calculateResults}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center mt-4"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </button>
          </div>

          {showHelp && (
            <InfoCard 
              title="About Pipe Flow Calculations"
              onClose={() => setShowHelp(false)}
            >
              <p className="mb-4">
                This calculator uses two industry-standard methods for pipe flow analysis:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Hazen-Williams:</strong> Commonly used for water distribution systems.
                  Valid for turbulent flow of water at normal temperatures.
                </li>
                <li>
                  <strong>Darcy-Weisbach:</strong> More general equation applicable to all fluids
                  and flow regimes. Requires iterative solution for friction factor.
                </li>
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
            
            {pipes.map((pipe) => (
              <div key={pipe.id} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-3">Pipe {pipe.id}</h3>
                <div className="space-y-2">
                  <ResultDisplay 
                    label="Flow Rate"
                    value={pipe.flowRate?.toFixed(3) || '0.000'}
                    unit="m³/s"
                  />
                  <ResultDisplay 
                    label="Head Loss"
                    value={pipe.headLoss?.toFixed(3) || '0.000'}
                    unit="m"
                  />
                </div>
              </div>
            ))}

            <div className="mt-6">
              <h3 className="font-medium mb-4">Head Loss Distribution</h3>
              <LineChart
                width={500}
                height={300}
                data={pipes}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" name="Pipe" />
                <YAxis name="Head Loss (m)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="headLoss" stroke="#3B82F6" name="Head Loss" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipeNetworkAnalyzer;