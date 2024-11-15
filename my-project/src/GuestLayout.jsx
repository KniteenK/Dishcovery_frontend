import React from "react";
import {GuestHeader} from "./components/Guest/GuestHeader";
import {Hero} from "./components/Guest/Hero";
import {Features} from "./components/Guest/Features";


export default function GuestLayout() {
  return (
    <div className="bg-white">
      <Headerlanding />
      <Hero
        heading="Welcome to Dishcovery"
        message="A platform tailored for you to take care of your cravings in a healthier way"
      />
      <section className="bg-white" id="features">
        <Features />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </div>
  );
}