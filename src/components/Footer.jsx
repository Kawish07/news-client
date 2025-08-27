import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-8 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="font-extrabold text-xl tracking-wide text-gold-600">PK News</span>
          <p className="text-sm mt-1">Contact: info@pknews.com</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gold-500 font-bold hover:underline">Facebook</a>
          <a href="#" className="text-gold-500 font-bold hover:underline">Twitter</a>
          <a href="#" className="text-gold-500 font-bold hover:underline">Instagram</a>
        </div>
        <div className="text-xs mt-4 md:mt-0">© 2025 PK News. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
