import React from 'react';
import { RatioData } from '../types';
import { Scale, Info } from 'lucide-react';

interface MetricCardProps {
  data: RatioData;
  weight: number;
  unit: string;
  isInput: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data, weight, unit, isInput }) => {
  const formattedWeight = weight.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <div 
      className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
        isInput ? 'bg-white ring-2 ring-stone-400' : 'bg-white/80'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
            <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data.color }}
            />
            <h3 className="font-semibold text-stone-800">{data.label}</h3>
        </div>
        {data.isEstimate && (
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Est.
            </span>
        )}
      </div>

      <div className="flex items-baseline gap-1 mt-3">
        <span className="text-3xl font-bold text-stone-900 tracking-tight">
            {formattedWeight}
        </span>
        <span className="text-sm font-medium text-stone-500">{unit}</span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500">
        <Scale className="w-3 h-3" />
        <span>Ratio: {data.ratio}:1 to Green</span>
      </div>
      
      <p className="mt-1 text-xs text-stone-400 italic">
        {data.description}
      </p>

      {/* Decorative colored bar at bottom */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1 opacity-50"
        style={{ backgroundColor: data.color }}
      />
    </div>
  );
};
