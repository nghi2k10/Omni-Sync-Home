import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Thermometer, Camera, Home } from 'lucide-react';
import { useSmartHome } from '@/context/SmartHomeContext';

export default function OverviewBar() {
  const { getStats } = useSmartHome();
  const stats = getStats();

  return (
    <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between bg-gradient-to-b from-[#07070D]/90 to-transparent">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">SmartHome DT</span>
      </Link>

      <div className="flex items-center gap-2">
        <StatChip icon={Lightbulb} value={`${stats.lightsOn}/${stats.lightsTotal}`} color="text-amber-400" />
        <StatChip icon={Thermometer} value={stats.avgTemp ? `${stats.avgTemp.toFixed(0)}°` : '--'} color="text-cyan-400" />
        <StatChip icon={Camera} value={`${stats.camerasOnline}/${stats.camerasTotal}`} color="text-green-400" />
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, value, color }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 backdrop-blur-xl border border-white/5">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-xs font-mono text-slate-300">{value}</span>
    </div>
  );
}