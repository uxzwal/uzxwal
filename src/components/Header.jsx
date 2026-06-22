import React from 'react';

const Header = () => {
  return (
    <header className="w-full border-b border-[#e5e7eb] bg-[#000000]">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div>
          <a href="#home" className="text-[18px] font-semibold text-[#f3f3f3] uppercase tracking-wide">
            Ujjwal Kumar
          </a>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#home" className="text-[#a6a6a6] hover:text-[#f3f3f3] text-[16px] font-medium transition-colors">Home</a>
          <a href="#about" className="text-[#a6a6a6] hover:text-[#f3f3f3] text-[16px] font-medium transition-colors">About</a>
          <a href="#projects" className="text-[#a6a6a6] hover:text-[#f3f3f3] text-[16px] font-medium transition-colors">Projects</a>
          <a href="#contact" className="text-[#a6a6a6] hover:text-[#f3f3f3] text-[16px] font-medium transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
