import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSmartHome } from '@/context/SmartHomeContext';
import { roomOrder } from '@/libs/homeConfig';
import LightControl from './LightControl';
import ACControl from './ACControl';
import CameraControl from './CameraControl';
import OverviewPanel from './OverviewPanel';

export default function Sidebar() {
  const { rooms, selectedRoom, setSelectedRoom } = useSmartHome();

  return (
    <div className="absolute md:right-0 md:top-16 md:bottom-0 md:w-96
                    bottom-0 left-0 right-0 md:max-h-none max-h-[55vh]
                    bg-slate-950/70 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/5
                    flex flex-col z-30">
      <div className="flex gap-1.5 p-3 overflow-x-auto border-b border-white/5 flex-shrink-0">
        {roomOrder.map((roomId) => {
          const room = rooms[roomId];
          const active = selectedRoom === roomId;
          return (
            <button
              key={roomId}
              onClick={() => setSelectedRoom(active ? null : roomId)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all
                ${active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'}`}
            >
              {room.name}
            </button>
          );
        })}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {selectedRoom ? (
            <RoomControls roomId={selectedRoom} />
          ) : (
            <OverviewPanel />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function RoomControls({ roomId }) {
  const { rooms } = useSmartHome();
  const room = rooms[roomId];
  if (!room) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">{room.name}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Tầng {room.floor}</p>
      </div>

      {room.lights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-slate-500">Ánh Sáng</h3>
          {room.lights.map((light) => (
            <LightControl key={light.id} roomId={roomId} light={light} />
          ))}
        </div>
      )}

      {room.ac && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-slate-500">Điều Hòa</h3>
          <ACControl roomId={roomId} ac={room.ac} />
        </div>
      )}

      {room.camera && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-slate-500">An Ninh</h3>
          <CameraControl roomId={roomId} camera={room.camera} roomName={room.name} />
        </div>
      )}
    </div>
  );
}