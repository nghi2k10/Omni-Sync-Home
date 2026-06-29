import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Snowflake, Flame, Wind, RefreshCw } from 'lucide-react';
import { useSmartHome } from '@/context/SmartHomeContext';

const modes = [
  { value: 'cool', label: 'Lạnh', icon: Snowflake, color: 'text-cyan-400' },
  { value: 'heat', label: 'Sưởi', icon: Flame, color: 'text-orange-400' },
  { value: 'fan', label: 'Quạt', icon: Wind, color: 'text-slate-400' },
  { value: 'auto', label: 'Auto', icon: RefreshCw, color: 'text-purple-400' },
];

export default function ACControl({ roomId, ac }) {
  const { toggleAC, setACTemperature, setACMode } = useSmartHome();

  return (
    <div className={`rounded-xl p-3 border transition-all
      ${ac.on
        ? 'bg-cyan-500/5 border-cyan-500/20'
        : 'bg-white/[0.02] border-white/5'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${ac.on ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
            <Snowflake className={`w-4 h-4 ${ac.on ? 'text-cyan-400' : 'text-slate-500'}`} />
          </div>
          <span className="text-sm font-medium text-white">Điều hòa</span>
        </div>
        <Switch
          checked={ac.on}
          onCheckedChange={() => toggleAC(roomId)}
          className="data-[state=checked]:bg-cyan-500"
        />
      </div>

      {ac.on && (
        <div className="space-y-4">
          <div className="text-center py-2">
            <div className="text-4xl font-bold font-mono text-white">
              {ac.currentTemp.toFixed(1)}°
            </div>
            <p className="text-xs text-slate-500 mt-1">Nhiệt độ hiện tại</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-400">Mục tiêu</span>
              <span className="text-xs font-mono text-cyan-400">{ac.temperature}°C</span>
            </div>
            <Slider
              value={[ac.temperature]}
              onValueChange={([v]) => setACTemperature(roomId, v)}
              min={16}
              max={30}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Chế độ</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => setACMode(roomId, mode.value)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all
                      ${ac.mode === mode.value
                        ? 'bg-white/10 border border-white/10'
                        : 'bg-white/[0.02] border border-transparent hover:bg-white/5'}`}
                  >
                    <Icon className={`w-4 h-4 ${ac.mode === mode.value ? mode.color : 'text-slate-500'}`} />
                    <span className={`text-[10px] ${ac.mode === mode.value ? 'text-white' : 'text-slate-500'}`}>
                      {mode.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}