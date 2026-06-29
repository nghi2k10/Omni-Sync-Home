import React, { createContext, useContext, useState, useEffect } from 'react';
import { homeConfig } from '@/libs/homeConfig';

const SmartHomeContext = createContext(null);

export function SmartHomeProvider({ children }) {
  const [rooms, setRooms] = useState(homeConfig);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleLight = (roomId, lightId) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        lights: prev[roomId].lights.map(l =>
          l.id === lightId ? { ...l, on: !l.on } : l
        ),
      },
    }));
  };

  const setLightBrightness = (roomId, lightId, brightness) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        lights: prev[roomId].lights.map(l =>
          l.id === lightId ? { ...l, brightness } : l
        ),
      },
    }));
  };

  const setLightColor = (roomId, lightId, color) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        lights: prev[roomId].lights.map(l =>
          l.id === lightId ? { ...l, color } : l
        ),
      },
    }));
  };

  const toggleAC = (roomId) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        ac: prev[roomId].ac ? { ...prev[roomId].ac, on: !prev[roomId].ac.on } : null,
      },
    }));
  };

  const setACTemperature = (roomId, temperature) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        ac: { ...prev[roomId].ac, temperature },
      },
    }));
  };

  const setACMode = (roomId, mode) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        ac: { ...prev[roomId].ac, mode },
      },
    }));
  };

  const toggleCameraOnline = (roomId) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        camera: prev[roomId].camera
          ? { ...prev[roomId].camera, online: !prev[roomId].camera.online }
          : null,
      },
    }));
  };

  const setCameraAngle = (roomId, angle) => {
    setRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        camera: { ...prev[roomId].camera, angle },
      },
    }));
  };

  // Simulate temperature drift toward target
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(roomId => {
          const ac = updated[roomId].ac;
          if (ac && ac.on) {
            const diff = ac.temperature - ac.currentTemp;
            if (Math.abs(diff) > 0.1) {
              updated[roomId] = {
                ...updated[roomId],
                ac: { ...ac, currentTemp: ac.currentTemp + diff * 0.15 },
              };
            }
          }
        });
        return updated;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const allLightsOff = () => {
    setRooms(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(roomId => {
        updated[roomId] = {
          ...updated[roomId],
          lights: updated[roomId].lights.map(l => ({ ...l, on: false })),
        };
      });
      return updated;
    });
  };

  const resetAll = () => {
    setRooms(JSON.parse(JSON.stringify(homeConfig)));
    setSelectedRoom(null);
  };

  const getStats = () => {
    let lightsOn = 0, lightsTotal = 0, acOn = 0, camerasOnline = 0, camerasTotal = 0;
    const temps = [];
    Object.values(rooms).forEach(room => {
      room.lights.forEach(l => {
        lightsTotal++;
        if (l.on) lightsOn++;
      });
      if (room.ac) {
        if (room.ac.on) { acOn++; temps.push(room.ac.currentTemp); }
      }
      if (room.camera) {
        camerasTotal++;
        if (room.camera.online) camerasOnline++;
      }
    });
    return {
      lightsOn, lightsTotal, acOn, camerasOnline, camerasTotal,
      avgTemp: temps.length > 0 ? temps.reduce((a, b) => a + b, 0) / temps.length : null,
      roomsWithLights: Object.values(rooms).filter(r => r.lights.some(l => l.on)).length,
    };
  };

  return (
    <SmartHomeContext.Provider value={{
      rooms, selectedRoom, setSelectedRoom,
      toggleLight, setLightBrightness, setLightColor,
      toggleAC, setACTemperature, setACMode,
      toggleCameraOnline, setCameraAngle,
      allLightsOff, resetAll, getStats,
    }}>
      {children}
    </SmartHomeContext.Provider>
  );
}

export function useSmartHome() {
  const ctx = useContext(SmartHomeContext);
  if (!ctx) throw new Error('useSmartHome must be used within SmartHomeProvider');
  return ctx;
}