

import React from "react";

const Hero = ({ heading, message }) => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-white mb-12 bg-fixed bg-cover bg-center" 
     style={{ backgroundImage: "url('/hero.jpg')" }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] flex flex-col">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <div className=" py-10 flex justify-around ">

          <a href="/login">
            <button className="px-8 py-2 border bg-secondary">Login</button>
          </a>
          <a href="/signup">
            <button className="px-8 py-2 border bg-primary">Signup</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
