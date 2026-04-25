import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 flex flex-col items-center justify-center gap-4 z-10 relative">
      <p className="text-white text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
        Powered By <a href="https://acesads.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-bold">AcesAds</a>
      </p>
    </footer>
  );
}
