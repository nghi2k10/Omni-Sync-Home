import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SmartHomeCanvas from '@/components/three/SmartHomeCanvas';
import Sidebar from '@/components/controls/Sidebar';
import OverviewBar from '@/components/controls/OverviewBar';
import { useSmartHome } from '@/context/SmartHomeContext';

export default function Demo() {
  const { rooms, selectedRoom, setSelectedRoom } = useSmartHome();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#07070D]">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <SmartHomeCanvas
          rooms={rooms}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </div>

      {/* Top bar */}
      <OverviewBar />

      {/* Sidebar */}
      <Sidebar />

      {/* Back button when room selected */}
      {selectedRoom && (
        <button
          onClick={() => setSelectedRoom(null)}
          className="absolute top-16 left-4 z-30 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 backdrop-blur-xl border border-white/10 text-slate-300 text-xs font-medium hover:bg-slate-900/60 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tổng Quan
        </button>
      )}

      {/* Mobile hint */}
      {!selectedRoom && (
        <div className="md:hidden absolute bottom-[57vh] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/10 text-[10px] text-slate-400 text-center">
            Chạm vào phòng để điều khiển
          </div>
        </div>
      )}
    </div>
  );
}