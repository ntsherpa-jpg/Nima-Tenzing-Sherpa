import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ConversionResult, RatioData, CoffeeStage } from '../types';
import { CONVERSION_DATA } from '../constants';

interface ConversionChartProps {
  results: ConversionResult[];
  unit: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-800 text-stone-50 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-stone-300">
          Weight: <span className="text-white font-mono">{payload[0].value.toFixed(2)} {unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const ConversionChart: React.FC<ConversionChartProps> = ({ results, unit }) => {
  // Filter out intermediate wet stages to keep chart clean, or keep all.
  // Let's show specific key dry states + green for comparison.
  const chartStages = [
    CoffeeStage.FRESH_CHERRY,
    CoffeeStage.DRIED_CHERRY,
    CoffeeStage.HONEY_PARCHMENT,
    CoffeeStage.DRY_PARCHMENT,
    CoffeeStage.GREEN_COFFEE
  ];

  const data = chartStages.map(stage => {
    const result = results.find(r => r.stage === stage);
    const meta = CONVERSION_DATA[stage];
    return {
      name: meta.label,
      shortName: meta.label.split(' ')[0], // Simpler label for mobile
      weight: result ? result.weight : 0,
      color: meta.color,
      ratio: meta.ratio
    };
  });

  return (
    <div className="w-full h-64 md:h-80 bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
      <h3 className="text-sm font-semibold text-stone-500 mb-4 uppercase tracking-wider">Mass Reduction Visualization</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
          <XAxis 
            dataKey="shortName" 
            tick={{ fontSize: 10, fill: '#78716c' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#78716c' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} cursor={{fill: '#f5f5f4'}} />
          <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
