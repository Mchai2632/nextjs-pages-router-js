import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function VisionScroll3D() {
  const spline = useRef(null);
  const objectRef = useRef(null);
  const triggerRef = useRef(null);

  const map = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  function onLoad(splineApp) {
    spline.current = splineApp;
    objectRef.current = splineApp.findObjectByName("Cube3D");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current || !objectRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.2;
      const end = windowHeight * 0.8;

      const progress = clamp(1 - (rect.top - start) / (end - start), 0, 1);

      const rotateY = map(progress, 0, 1, 0, Math.PI * 1.5);

      objectRef.current.rotation.y = rotateY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[250vh]">
      <div className="absolute top-[20%]">
        <motion.p className="">This is a 3DCube.</motion.p>
      </div>
      <div className="absolute top-[30%]">
        <p className="">This is a 3Dsbe.</p>
      </div>

      {/* Scroll Trigger Area */}
      <div ref={triggerRef} className="h-[100vh] sticky top-0 flex items-center justify-center">
        <Spline onLoad={onLoad} scene="https://prod.spline.design/a28x3ZIFEKPCDzJ2/scene.splinecode" className="w-full max-w-[800px] h-full" />
      </div>
    </section>
  );
}
