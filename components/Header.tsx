
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex h-20 items-center justify-between px-6 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg shadow-orange-200">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">Magic</h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Wallpaper</p>
        </div>
      </div>
      <div className="rounded-full bg-pink-100 px-4 py-1.5 ring-2 ring-pink-200">
        <span className="text-[12px] font-bold text-pink-600 uppercase tracking-wide">Free Magic!</span>
      </div>
    </header>
  );
};

export default Header;
