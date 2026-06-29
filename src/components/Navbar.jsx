import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold tracking-tight">SmartHome DT</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/demo" className="text-slate-400 hover:text-white transition-colors text-sm hidden sm:block">
          Demo
        </Link>
        <Link
          to="/demo"
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
        >
          Khám Phá
        </Link>
      </div>
    </nav>
  );
}