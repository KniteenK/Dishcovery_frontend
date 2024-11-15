import React from "react";
import GuestHeader from "./components/Guest/Header/GuestHeader";
import Hero from "./components/Guest/Hero"
import Features from "./components/Guest/Features";


const t={
  "heading":"Welcome to Dishcovery",
  "message":"A platform that helps you discover new and healthier dishes, making nutritious eating easy and exciting."
 }
export default function GuestLayout() {
  return (
    <div className="bg-white">
      <GuestHeader />
      <Hero
        heading="Welcome to Dishcovery"
        message="A platform tailored for you to take care of your cravings in a healthier way"
      />
      <section className="bg-white" id="features">
        <Features />
      </section>
    
    </div>
  );
}