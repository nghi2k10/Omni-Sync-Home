import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';

function FeedCanvas({ online }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!online) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const startTime = Date.now();

    const draw = () => {
      const t = Date.now() - startTime;
      const w = canvas.width;
      const h = canvas.height;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#0a0a12');
      bg.addColorStop(1, '#050508');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(76, 175, 80, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.72);
      ctx.lineTo(w, h * 0.72);
      ctx.moveTo(w * 0.12, h * 0.18);
      ctx.lineTo(w * 0.12, h * 0.72);
      ctx.lineTo(0, h);
      ctx.moveTo(w * 0.88, h * 0.18);
      ctx.lineTo(w * 0.88, h * 0.72);
      ctx.lineTo(w, h);
      ctx.moveTo(w * 0.12, h * 0.18);
      ctx.lineTo(w * 0.88, h * 0.18);
      ctx.stroke();

      const objX = w * 0.5 + Math.sin(t * 0.0008) * w * 0.25;
      const objY = h * 0.58;
      ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
      ctx.beginPath();
      ctx.arc(objX, objY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(76, 175, 80, 0.4)';
      ctx.beginPath();
      ctx.arc(objX, objY, 8, 0, Math.PI * 2);
      ctx.fill();

      const scanY = (t * 0.06) % h;
      ctx.fillStyle = 'rgba(76, 175, 80, 0.06)';
      ctx.fillRect(0, scanY, w, 4);

      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.04})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.7);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [online]);

  if (!online) {
    return (
      <div className="w-full aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
        <p className="text-slate-500 text-sm">Camera Offline</p>
      </div>
    );
  }

  return <canvas ref={canvasRef} width={640} height={360} className="w-full aspect-video rounded-lg" />;
}

function Timestamp() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = `${pad(time.getDate())}/${pad(time.getMonth() + 1)}/${time.getFullYear()}`;
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <div className="absolute bottom-3 left-3 font-mono text-xs text-green-400/80 bg-black/40 px-2 py-1 rounded">
      {dateStr} {timeStr}
    </div>
  );
}

export default function CameraFeedModal({ open, onOpenChange, camera, roomName }) {
  if (!camera) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-950 border-white/10 max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-green-400" />
            {camera.name}
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          <FeedCanvas online={camera.online} />
          {camera.online && (
            <>
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-xs text-red-400">REC</span>
              </div>
              <div className="absolute top-3 right-3 font-mono text-xs text-green-400/80 bg-black/40 px-2 py-1 rounded">
                {roomName}
              </div>
              <Timestamp />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}