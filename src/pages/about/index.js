import { useWindowWidth } from "@/hooks/useWindowWidth";
import AboutWrapper from "@/layout/page/about";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <AboutWrapper>
      <div className="relative aspect-[16/6.7] ">
        <Image src="/images/bg3.png" alt="banner" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 100vw" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex  items-center mx-auto bg-blue-500 justify-center w-1/2">
          <button className="rounded bg-red-500 px-6 py-3 text-white">View More</button>
        </div>
      </div>
      <div className="max-w-sm ">
        <div className="relative aspect-5/3 w-full max-w-sm">
          <Image src="/images/1920_1152.png" alt="banner" fill className="object-cover" sizes="(max-width: 768px) 100vw, 384px" />
        </div>

        <h1>TItle</h1>
        <p>description</p>

        <button> Book Now</button>
      </div>
    </AboutWrapper>
  );
}
