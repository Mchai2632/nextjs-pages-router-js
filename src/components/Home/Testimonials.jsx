import React from "react";
import Orbit from "@/components/ui/Orbit";

export default function Testimonials() {
  return (
    <section className="relative w-full flex bg-bg text-text ">
      <div className="w-1/2 flex gap-2 flex-col justify-center items-center">
        <h1>TESTIMONIALS</h1>
        <hr className="w-[10%]" />
        <p>Let’s see what our customers say !</p>
      </div>
      <div className="relative w-1/2 overflow-hidden  ">
        <div className="absolute w-full h-full bg-linear-to-r from-transparent to-orange-400/50 py-[3rem]" />
        {/* <div className="z-20 absolute w-full h-[30%] bg-black/20 "></div> */}
        <Orbit direction={0} />
        <div className="absolute h-full w-full top-0 blur-mask  pointer-events-none" />
      </div>
    </section>
  );
}
