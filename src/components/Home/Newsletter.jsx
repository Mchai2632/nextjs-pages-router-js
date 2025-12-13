import { Send } from "lucide-react";
import React from "react";
import { Input } from "../ui/form";

export default function Newsletter() {
  return (
    <section className="relative w-full flex flex-col bg-bg text-text  py-[3rem]">
      <div className="flex gap-1 md:gap-2 flex-col justify-center items-center">
        <h1>NEWSLETTERS</h1>
        <hr className="w-[10%]" />
        <h2>Join Golden Signature Community</h2>
        <p>Get access to exclusive codes, content and new packages before anyone else!</p>
        {/* input  */}
        <div className="w-[20%] flex gap-2">
          <Input type="text" placeholder="Enter your email" />
          <button className="bg-primary/50 px-2 rounded-md">
            <Send fill="white" className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
