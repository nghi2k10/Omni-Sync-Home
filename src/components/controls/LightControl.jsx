import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Lightbulb } from 'lucide-react';
import { useSmartHome } from '@/context/SmartHomeContext';

const presetColors = ['#FFC857', '#FF8A65', '#5CE1E6', '#A78BFA', '#FFFFFF'];

export default function LightControl({ roomId, light }) {
  const { toggleLight, setLightBrightness, setLightColor } = useSmartHome();

  return (
    <div className={`rounded-xl p-3 border transition-all
      ${light.on
        ? 'bg-amber-500/5 border-amber-500/20'
        : 'bg-white/[0.02] border-white/5'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${light.on ? 'bg-amber-500/20' : 'bg-white/5'}`}>
            <Lightbulb
              className={`w-4 h-4 ${light.on ? 'text-amber-400' : 'text-slate-500'}`}
              fill={light.on ? 'currentColor' : 'none'}
            />
          </div>
          <span className="text-sm font-medium text-white">{light.name}</span>
        </div>
        <Switch
          checked={light.on}
          onCheckedChange={() => toggleLight(roomId, light.id)}
          className="data-[state=checked]:bg-amber-500"
        />
      </div>

      {light.on && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-400">Độ sáng</span>
              <span className="text-xs font-mono text-amber-400">{light.brightness}%</span>
            </div>
            <Slider
              value={[light.brightness]}
              onValueChange={([v]) => setLightBrightness(roomId, light.id, v)}
              min={5}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-400">Màu sắc</span>
            </div>
            <div className="flex gap-2 items-center">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setLightColor(roomId, light.id, color)}
                  className={`w-7 h-7 rounded-full transition-all border-2
                    ${light.color === color ? 'border-white scale-110' : 'border-transparent opacity-60'}`}
                  style={{
                    backgroundColor: color,
                    boxShadow: light.color === color ? `0 0 12px ${color}` : 'none',
                  }}
                />
              ))}
              <input
                type="color"
                value={light.color}
                onChange={(e) => setLightColor(roomId, light.id, e.target.value)}
                className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-2 border-white/10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}