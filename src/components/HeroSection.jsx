import React from 'react';

function HeroSection({ title, description, bgImage }) {
  return (
    <section className="relative w-full h-[350px] flex items-center justify-center" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow">{description}</p>
      </div>
    </section>
  );
}

export default HeroSection;
