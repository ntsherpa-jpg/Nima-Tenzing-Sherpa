import React, { useState, useMemo, useEffect } from 'react';
import { CoffeeStage, ConversionResult } from './types';
import { CONVERSION_DATA, STAGE_ORDER } from './constants';
import { MetricCard } from './components/MetricCard';
import { ConversionChart } from './components/ConversionChart';
import { Leaf, ArrowRight, Bean, Settings2, Calculator } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [inputValue, setInputValue] = useState<number>(100);
  const [inputUnit, setInputUnit] = useState<string>('kg');
  const [inputStage, setInputStage] = useState<CoffeeStage>(CoffeeStage.FRESH_CHERRY);
  
  // Calculate results
  const results: ConversionResult[] = useMemo(() => {
    if (isNaN(inputValue) || inputValue < 0) return [];

    // 1. Convert Input to Green Coffee Base
    const inputRatio = CONVERSION_DATA[inputStage].ratio;
    const greenEquivalent = inputValue / inputRatio;

    // 2. Project Green Coffee Base to all other stages
    return STAGE_ORDER.map(stage => {
      const targetRatio = CONVERSION_DATA[stage].ratio;
      return {
        stage: stage,
        weight: greenEquivalent * targetRatio
      };
    });
  }, [inputValue, inputStage]);

  // Derived Values for Highlight
  const greenResult = results.find(r => r.stage === CoffeeStage.GREEN_COFFEE);
  const parchmentResult = results.find(r => r.stage === CoffeeStage.DRY_PARCHMENT);
  const naturalResult = results.find(r => r.stage === CoffeeStage.DRIED_CHERRY);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-coffee-cherry text-white p-1.5 rounded-lg">
                <Bean className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">YieldCalc</h1>
          </div>
          <div className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            CQI Standard Ratios
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Intro */}
        <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">Coffee Processing Converter</h2>
            <p className="text-stone-600 max-w-2xl">
                Calculate expected yields from Fresh Cherry to Exportable Green Coffee using standard mass conversion ratios. 
                Compare Natural, Washed, and Honey process outcomes.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-stone-400" />
                <h3 className="text-lg font-semibold text-stone-800">Input Data</h3>
              </div>
              
              <div className="space-y-5">
                {/* Stage Selector */}
                <div>
                  <label className="block text-sm font-medium text-stone-500 mb-2">Source Form</label>
                  <select 
                    value={inputStage}
                    onChange={(e) => setInputStage(e.target.value as CoffeeStage)}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg focus:ring-coffee-green focus:border-coffee-green block p-3 transition-colors outline-none"
                  >
                    {STAGE_ORDER.map(stage => (
                      <option key={stage} value={stage}>
                        {CONVERSION_DATA[stage].label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mass Input */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                         <label className="block text-sm font-medium text-stone-500 mb-2">Weight</label>
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-lg font-semibold rounded-lg focus:ring-coffee-green focus:border-coffee-green block p-2.5 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-500 mb-2">Unit</label>
                         <select 
                            value={inputUnit}
                            onChange={(e) => setInputUnit(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-lg font-semibold rounded-lg focus:ring-coffee-green focus:border-coffee-green block p-2.5 outline-none"
                        >
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                            <option value="qq">qq</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* Input Summary */}
              <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div className="text-sm text-stone-500">Current Input</div>
                <div className="text-xl font-bold text-coffee-roast">
                    {inputValue.toLocaleString()} <span className="text-sm font-normal text-stone-500">{inputUnit}</span>
                </div>
                <div className="text-sm text-stone-400">{CONVERSION_DATA[inputStage].label}</div>
              </div>
            </div>

            {/* Quick Stats / Legend */}
            <div className="bg-stone-100 p-5 rounded-xl border border-stone-200 hidden lg:block">
                <h4 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-3">Conversion Standard</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex justify-between">
                        <span>Natural Process</span>
                        <span className="font-mono text-stone-900 font-semibold">2.25:1</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Washed Process</span>
                        <span className="font-mono text-stone-900 font-semibold">1.25:1</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Fresh Cherry</span>
                        <span className="font-mono text-stone-900 font-semibold">5.56:1</span>
                    </li>
                </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Primary Result: Green Coffee */}
            {greenResult && (
                <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                     
                     <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-stone-400 mb-2">
                                <Leaf className="w-5 h-5 text-green-400" />
                                <span className="uppercase tracking-wider text-xs font-bold">Export Goal</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-1">Exportable Green Coffee</h2>
                            <p className="text-stone-400 text-sm max-w-md">The final milled bean ready for export, equivalent to the provided input.</p>
                        </div>
                        <div className="text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 min-w-[180px]">
                            <div className="text-4xl font-bold text-green-400">
                                {greenResult.weight.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </div>
                            <div className="text-stone-300 font-medium">{inputUnit}</div>
                        </div>
                     </div>
                </div>
            )}

            {/* Visual Chart */}
            <ConversionChart results={results} unit={inputUnit} />

            {/* Detailed Cards Grid */}
            <div>
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-stone-400" />
                    Processing Stages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Render cards excluding Green (shown above) and input (optionally highlight) */}
                    {STAGE_ORDER.filter(s => s !== CoffeeStage.GREEN_COFFEE).map(stage => {
                        const res = results.find(r => r.stage === stage);
                        if (!res) return null;
                        
                        return (
                            <MetricCard 
                                key={stage}
                                data={CONVERSION_DATA[stage]}
                                weight={res.weight}
                                unit={inputUnit}
                                isInput={inputStage === stage}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg text-sm text-amber-800 flex gap-3">
                <div className="mt-0.5">
                    <ArrowRight className="w-4 h-4" />
                </div>
                <div>
                    <strong>Note on Honey Process:</strong> The provided source data does not explicitly list Honey Process ratios. 
                    We have estimated the "Dry Honey" yield at a ratio of 1.30:1, slightly higher than Dry Parchment (1.25:1) to account for dried mucilage adhering to the parchment.
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
