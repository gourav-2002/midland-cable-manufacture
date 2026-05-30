import React from 'react';
import { Shield, Zap, Car, Building, Check } from 'lucide-react';
import { INDUSTRIES } from '../data';

export default function Industries() {
  return (
    <div className="bg-white text-industrial-black min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title Group */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-bronze-primary font-bold">
            GRID DEPLOYMENTS & SUBSTATION COMPATIBILITY
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-industrial-black">
            Our Supported <span className="text-bronze-primary">Sectors</span>
          </h1>
          <div className="h-[2px] w-16 bg-bronze-primary" />
        </div>

        {/* Dynamic Division Breakdown */}
        <div className="space-y-6">
          {INDUSTRIES.map((ind) => (
            <div key={ind.id} className="p-6 bg-industrial-gray-light rounded-[4px] border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-bronze-primary uppercase tracking-widest font-black flex items-center gap-1.5">
                  &bull; {ind.name} Division
                </span>
                <p className="text-xs text-gray-600 max-w-xl font-sans tracking-wide">
                  {ind.description}
                </p>
              </div>

              {/* Stat block */}
              <div className="p-4 bg-white border border-gray-200 rounded-[4px] min-w-[200px] text-right">
                <span className="text-[9px] font-mono text-gray-400 block uppercase">Sector Specification</span>
                <span className="text-xs font-bold text-industrial-black block mt-0.5">{ind.stats.split(':')[0]}</span>
                <span className="text-sm font-black text-bronze-primary block mt-0.5">{ind.stats.split(':')[1] || ind.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
