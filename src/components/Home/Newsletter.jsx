import { Send } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/form";
import { cn } from "@/utils/cn";

export default function Newsletter() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");

  return (
    <section className="relative w-full flex flex-col bg-bg text-text  py-[3rem]">
      <div className="flex gap-1 md:gap-2 flex-col justify-center items-center">
        <h1>NEWSLETTERS</h1>
        <hr className="w-[10%]" />
        <h3 className="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">Join Golden Signature Community</h3>
        <p>Get access to exclusive codes, content and new packages before anyone else!</p>
        {/* input  */}
        <div className="flex gap-2">
          {/* <Input type="text" placeholder="Enter your email" /> */}
          <div className="relative w-64">
            <span
              className={cn(
                "absolute left-6 top-[12px] text-gray-400 transition-all duration-200 pointer-events-none",
                (isFocus || value) && "-translate-y-6 text-sm text-primary"
              )}
            >
              Enter your email
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              className="relative w-full py-3 px-6 outline-none ring-1 ring-primary/50 rounded-sm"
            />
          </div>
          <button className="bg-primary/50 px-4 rounded-md">
            <Send fill="white" className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
