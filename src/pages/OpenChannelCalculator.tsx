import { FC, useState, useEffect } from 'react';
import { Calculator, Download, HelpCircle } from 'lucide-react';
import CalculatorInput from '../components/CalculatorInput';
import ResultDisplay from '../components/ResultDisplay';
import ChannelDiagram from '../components/ChannelDiagram';
import InfoCard from '../components/InfoCard';

const OpenChannelCalculator: FC = () => {
  const [inputs, setInputs] = useState({
    flowRate: 2, // m³/s
    channelWidth: 3, // m
    channelDepth: 1.5, // m
    channelSlope: 0.001, // m/m
    manningN: 0.013, // concrete
  });

  const [results, setResults] = useState({
    velocity: 0,
    area: 0,
    hydraulicRadius: 0,
    froudeNumber: 0,
    flowType: '',
    shearStress: 0,
  });

  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const calculateResults = () => {
    const { flowRate, channelWidth, channelDepth, channelSlope, manningN } = inputs;
    
    // Calculate cross-sectional area (rectangular channel)
    const area = channelWidth * channelDepth;
    
    // Calculate wetted perimeter
    const wettedPerimeter = channelWidth + 2 * channelDepth;
    
    // Calculate hydraulic radius
    const hydraulicRadius = area / wettedPerimeter;
    
    // Calculate velocity using Manning's equation
    const velocity = (1.0 / manningN) * Math.pow(hydraulicRadius, 2/3) * Math.pow(channelSlope, 1/2);
    
    // Calculate Froude number
    const froudeNumber = velocity / Math.sqrt(9.81 * channelDepth);
    
    // Determine flow type
    const flowType = froudeNumber < 1 ? 'Subcritical' : froudeNumber > 1 ? 'Supercritical' : 'Critical';
    
    // Calculate shear stress
    const shearStress = 9810 * hydraulicRadius * channelSlope; // N/m²
    
    setResults({
      velocity,
      area,
      hydraulicRadius,
      froudeNumber,
      flowType,
      shearStress,
    });
  };

  const handleInputChange = (name: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const exportResults = () => {
    const data = {
      inputs,
      results,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'open-channel-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Open Channel Flow Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate flow parameters for open channels using Manning's equation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Channel Parameters</h2>
              <button 
                onClick={() => setShowHelp(!showHelp)}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <CalculatorInput 
                label="Flow Rate (Q)"
                name="flowRate"
                value={inputs.flowRate}
                min={0.1}
                max={50}
                step={0.1}
                unit="m³/s"
                onChange={(value) => handleInputChange('flowRate', value)}
              />
              
              <CalculatorInput 
                label="Channel Width (b)"
                name="channelWidth"
                value={inputs.channelWidth}
                min={0.5}
                max={20}
                step={0.1}
                unit="m"
                onChange={(value) => handleInputChange('channelWidth', value)}
              />
              
              <CalculatorInput 
                label="Channel Depth (y)"
                name="channelDepth"
                value={inputs.channelDepth}
                min={0.1}
                max={10}
                step={0.1}
                unit="m"
                onChange={(value) => handleInputChange('channelDepth', value)}
              />
              
              <CalculatorInput 
                label="Channel Slope (S)"
                name="channelSlope"
                value={inputs.channelSlope}
                min={0.0001}
                max={0.1}
                step={0.0001}
                unit="m/m"
                onChange={(value) => handleInputChange('channelSlope', value)}
              />
              
              <CalculatorInput 
                label="Manning's Roughness (n)"
                name="manningN"
                value={inputs.manningN}
                min={0.01}
                max={0.05}
                step={0.001}
                unit=""
                onChange={(value) => handleInputChange('manningN', value)}
              />
            </div>

            <div className="mt-6">
              <button 
                onClick={calculateResults}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </button>
            </div>
          </div>

          {showHelp && (
            <InfoCard 
              title="About Manning's Equation"
              onClose={() => setShowHelp(false)}
            >
              <p className="mb-4">
                Manning's equation is used to calculate the average velocity of water in an open channel:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4 font-mono text-center">
                V = (1/n) × R<sup>2/3</sup> × S<sup>1/2</sup>
              </div>
              <p className="mb-2">Where:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>V = Velocity (m/s)</li>
                <li>n = Manning's roughness coefficient</li>
                <li>R = Hydraulic radius (m)</li>
                <li>S = Channel slope (m/m)</li>
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
              <ResultDisplay label="Flow Velocity" value={results.velocity.toFixed(2)} unit="m/s" />
              <ResultDisplay label="Cross-sectional Area" value={results.area.toFixed(2)} unit="m²" />
              <ResultDisplay label="Hydraulic Radius" value={results.hydraulicRadius.toFixed(3)} unit="m" />
              <ResultDisplay label="Froude Number" value={results.froudeNumber.toFixed(3)} unit="" />
              <ResultDisplay 
                label="Flow Type" 
                value={results.flowType} 
                unit=""
                highlight={true}
                color={
                  results.flowType === "Subcritical" ? "blue" : 
                  results.flowType === "Supercritical" ? "orange" : "green"
                }
              />
              <ResultDisplay label="Boundary Shear Stress" value={results.shearStress.toFixed(1)} unit="N/m²" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Channel Visualization</h2>
            <ChannelDiagram 
              width={inputs.channelWidth}
              depth={inputs.channelDepth}
              flowRate={inputs.flowRate}
              velocity={results.velocity}
              flowType={results.flowType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenChannelCalculator;