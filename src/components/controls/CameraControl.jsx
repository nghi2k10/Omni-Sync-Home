import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Camera, Video } from 'lucide-react';
import { useSmartHome } from '@/context/SmartHomeContext';
import CameraFeedModal from './CameraFeedModal';

export default function CameraControl({ roomId, camera, roomName }) {
  const { toggleCameraOnline, setCameraAngle } = useSmartHome();
  const [showFeed, setShowFeed] = useState(false);

  return (
    <>
      <div className={`rounded-xl p-3 border transition-all
        ${camera.online
          ? 'bg-green-500/5 border-green-500/20'
          : 'bg-white/[0.02] border-white/5'}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
              ${camera.online ? 'bg-green-500/20' : 'bg-white/5'}`}>
              <Camera className={`w-4 h-4 ${camera.online ? 'text-green-400' : 'text-slate-500'}`} />
            </div>
            <div>
              <span className="text-sm font-medium text-white block">{camera.name}</span>
              <span className={`text-[10px] ${camera.online ? 'text-green-400' : 'text-slate-500'}`}>
                {camera.online ? '● Online' : '○ Offline'}
              </span>
            </div>
          </div>
          <Switch
            checked={camera.online}
            onCheckedChange={() => toggleCameraOnline(roomId)}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {camera.online && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-400">Góc xoay</span>
                <span className="text-xs font-mono text-green-400">{camera.angle}°</span>
              </div>
              <Slider
                value={[camera.angle]}
                onValueChange={([v]) => setCameraAngle(roomId, v)}
                min={0}
                max={360}
                step={5}
                className="cursor-pointer"
              />
            </div>

            <button
              onClick={() => setShowFeed(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium
                hover:bg-green-500/20 transition-all"
            >
              <Video className="w-4 h-4" />
              Xem Live Feed
            </button>
          </div>
        )}
      </div>

      <CameraFeedModal
        open={showFeed}
        onOpenChange={setShowFeed}
        camera={camera}
        roomName={roomName}
      />
    </>
  );
}