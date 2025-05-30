import { FC, useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import InfoCard from '../components/InfoCard';

interface Example {
  id: string;
  title: string;
  description: string;
  theory: string;
  steps: {
    text: string;
    formula?: string;
    hint?: string;
  }[];
}

const examples: Record<string, Example[]> = {
  'open-channel': [
    {
      id: 'oc1',
      title: 'Manning\'s Equation Application',
      description: 'Calculate flow rate in a trapezoidal channel',
      theory: `Manning's equation is used to calculate the average velocity of water in an open channel:
V = (1/n) × R^(2/3) × S^(1/2)
where:
- V is velocity (m/s)
- n is Manning's roughness coefficient
- R is hydraulic radius (m)
- S is channel slope (m/m)`,
      steps: [
        {
          text: 'Calculate the cross-sectional area (A)',
          formula: 'A = (b + zy)y',
          hint: 'b is bottom width, z is side slope, y is depth'
        },
        {
          text: 'Calculate the wetted perimeter (P)',
          formula: 'P = b + 2y√(1 + z²)',
          hint: 'Consider all surfaces in contact with water'
        },
        {
          text: 'Calculate the hydraulic radius (R)',
          formula: 'R = A/P',
          hint: 'R represents the efficiency of the channel cross-section'
        },
        {
          text: 'Apply Manning\'s equation',
          formula: 'Q = (1/n)AR^(2/3)S^(1/2)',
          hint: 'Q is the flow rate in m³/s'
        }
      ]
    }
  ],
  'pipe-network': [
    {
      id: 'pn1',
      title: 'Hazen-Williams Equation',
      description: 'Calculate head loss in a pipe system',
      theory: `The Hazen-Williams equation is commonly used for water flow in pressure pipes:
hf = 10.67 × L × Q^1.85 / (C^1.85 × D^4.87)
where:
- hf is head loss (m)
- L is pipe length (m)
- Q is flow rate (m³/s)
- C is Hazen-Williams coefficient
- D is pipe diameter (m)`,
      steps: [
        {
          text: 'Identify pipe characteristics',
          hint: 'Length, diameter, and material (C value)'
        },
        {
          text: 'Calculate flow rate from velocity',
          formula: 'Q = V × A',
          hint: 'A is cross-sectional area'
        },
        {
          text: 'Apply Hazen-Williams equation',
          formula: 'hf = 10.67 × L × Q^1.85 / (C^1.85 × D^4.87)',
          hint: 'Ensure consistent units'
        }
      ]
    }
  ],
  'stormwater': [
    {
      id: 'sw1',
      title: 'SCS-CN Method',
      description: 'Calculate runoff from a rainfall event',
      theory: `The SCS-CN method estimates direct runoff from rainfall:
Q = (P - Ia)² / (P - Ia + S)
where:
- Q is runoff depth
- P is rainfall depth
- Ia is initial abstraction
- S is potential maximum retention`,
      steps: [
        {
          text: 'Determine the Curve Number (CN)',
          hint: 'Based on land use and soil type'
        },
        {
          text: 'Calculate potential retention (S)',
          formula: 'S = (25400 / CN) - 254',
          hint: 'S in millimeters'
        },
        {
          text: 'Calculate initial abstraction (Ia)',
          formula: 'Ia = 0.2 × S',
          hint: 'Standard assumption'
        },
        {
          text: 'Calculate runoff depth (Q)',
          formula: 'Q = (P - Ia)² / (P - Ia + S)',
          hint: 'Only valid when P > Ia'
        }
      ]
    }
  ]
};

const EducationalMode: FC = () => {
  const [activeTab, setActiveTab] = useState('open-channel');
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [showTheory, setShowTheory] = useState(true);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Educational Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn hydraulic concepts through guided examples and step-by-step solutions.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {['open-channel', 'pipe-network', 'stormwater'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={() => setShowTheory(!showTheory)}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <BookOpen size={20} className="mr-2" />
              <span className="font-medium">Theoretical Background</span>
              {showTheory ? <ChevronDown size={20} className="ml-2" /> : <ChevronRight size={20} className="ml-2" />}
            </button>
            
            {showTheory && (
              <div className="mt-4">
                <InfoCard
                  title="Key Concepts"
                  onClose={() => setShowTheory(false)}
                >
                  {activeTab === 'open-channel' && (
                    <>
                      <h4 className="font-medium mb-2">Open Channel Flow Principles</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Flow occurs with a free surface exposed to atmospheric pressure</li>
                        <li>Manning's equation is the primary tool for analysis</li>
                        <li>Critical depth occurs when specific energy is minimum</li>
                        <li>Flow can be subcritical, critical, or supercritical</li>
                      </ul>
                    </>
                  )}
                  {activeTab === 'pipe-network' && (
                    <>
                      <h4 className="font-medium mb-2">Pipe Flow Fundamentals</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Flow is pressurized (no free surface)</li>
                        <li>Head loss occurs due to friction and minor losses</li>
                        <li>Conservation of mass and energy principles apply</li>
                        <li>Network analysis requires simultaneous equation solving</li>
                      </ul>
                    </>
                  )}
                  {activeTab === 'stormwater' && (
                    <>
                      <h4 className="font-medium mb-2">Stormwater Hydrology</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Rainfall-runoff relationship is non-linear</li>
                        <li>Curve Number method accounts for land use and soil type</li>
                        <li>Initial abstraction includes interception and depression storage</li>
                        <li>Time of concentration affects peak flow rate</li>
                      </ul>
                    </>
                  )}
                </InfoCard>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {examples[activeTab].map((example) => (
              <div
                key={example.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedExample(expandedExample === example.id ? null : example.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{example.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{example.description}</p>
                  </div>
                  {expandedExample === example.id ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </button>

                {expandedExample === example.id && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Theory</h4>
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {example.theory}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Solution Steps</h4>
                      <div className="space-y-4">
                        {example.steps.map((step, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              Step {index + 1}: {step.text}
                            </p>
                            {step.formula && (
                              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-sm">
                                {step.formula}
                              </div>
                            )}
                            {step.hint && (
                              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Hint: {step.hint}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalMode;