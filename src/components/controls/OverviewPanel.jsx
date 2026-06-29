import React from 'react';
import { Lightbulb, Thermometer, Camera, Power, RotateCcw } from 'lucide-react';
import { useSmartHome } from '@/context/SmartHomeContext';
import { roomOrder } from '@/libs/homeConfig';

export default function OverviewPanel() {
  const { rooms, getStats, allLightsOff, resetAll } = useSmartHome();
  const stats = getStats();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Tổng Quan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Trạng thái toàn bộ thiết bị</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <StatCard icon={Lightbulb} label="Đèn bật" value={`${stats.lightsOn}/${stats.lightsTotal}`} color="amber" />
        <StatCard icon={Thermometer} label="Nhiệt độ TB" value={stats.avgTemp ? `${stats.avgTemp.toFixed(1)}°` : '--'} color="cyan" />
        <StatCard icon={Camera} label="Camera online" value={`${stats.camerasOnline}/${stats.camerasTotal}`} color="green" />
        <StatCard icon={Lightbulb} label="Phòng sáng" value={`${stats.roomsWithLights}/${roomOrder.length}`} color="purple" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-slate-500">Phòng</h3>
        {roomOrder.map((roomId) => {
          const room = rooms[roomId];
          const lightsOn = room.lights.filter(l => l.on).length;
          return (
            <div key={roomId} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-sm text-slate-300">{room.name}</span>
              <div className="flex items-center gap-3">
                {lightsOn > 0 && (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Lightbulb className="w-3 h-3" fill="currentColor" />
                    {lightsOn}
                  </span>
                )}
                {room.ac?.on && (
                  <span className="flex items-center gap-1 text-xs text-cyan-400">
                    <Thermometer className="w-3 h-3" />
                    {room.ac.temperature}°
                  </span>
                )}
                {room.camera && (
                  <span className={`flex items-center gap-1 text-xs ${room.camera.online ? 'text-green-400' : 'text-slate-600'}`}>
                    <Camera className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={allLightsOff}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/5 border border-red-500/15 text-red-400 text-xs font-medium hover:bg-red-500/10 transition-all"
        >
          <Power className="w-3.5 h-3.5" />
          Tắt tất cả đèn
        </button>
        <button
          onClick={resetAll}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 text-xs font-medium hover:bg-white/5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    amber: 'text-amber-400 bg-amber-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    green: 'text-green-400 bg-green-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
  };

  return (
    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-2xl font-bold font-mono text-white">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}