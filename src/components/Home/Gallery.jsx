import { cn } from "@/utils/cn";
import { ZoomIn } from "lucide-react";
import React, { useState } from "react";

const gallery = [
  "https://picsum.photos/id/1/1920/1080",
  "https://picsum.photos/id/2/1920/1080",
  "https://picsum.photos/id/3/1920/1080",
  "https://picsum.photos/id/4/1920/1080",
  "https://picsum.photos/id/5/1920/1080",
  "https://picsum.photos/id/6/1920/1080",
  "https://picsum.photos/id/7/1920/1080",
  "https://picsum.photos/id/8/1920/1080",
  "https://picsum.photos/id/12/1920/1080",
];

export default function Gallery() {
  const [isHover, setIsHover] = useState(null);

  return (
    <section className="relative w-full flex flex-col bg-bg text-text  py-[3rem]">
      <div className="flex gap-1 md:gap-2 flex-col justify-center items-center">
        <h1>GALLERY</h1>
        <hr className="w-[10%]" />
        <p>Explore the moments we’ve captured !</p>
      </div>
      <div className="gallery1-wrapper mt-3 md:mt-10">
        {gallery.map((item, i) => {
          return (
            <div
              key={i}
              className={cn("relative aspect-3/2 overflow-hidden ", i === 0 ? "item1" : "")}
              onMouseEnter={() => setIsHover(i)}
              onMouseLeave={() => setIsHover(null)}
            >
              <img src={item} alt="" className={cn("h-full w-full object-cover transition-transform duration-500", isHover === i && "scale-105")} />
              <div
                className={cn(
                  "absolute top-0 w-full h-full transition-all duration-300 flex justify-center items-center",
                  isHover === i && "bg-black/30 backdrop-blur-[2px]"
                )}
              >
                {
                  <ZoomIn
                    size={22}
                    className={cn(
                      "bg-white p-2 w-10 h-10 rounded-full text-black duration-500 transition-all cursor-pointer",
                      isHover === i ? "opacity-100 translate-y-2.5" : "opacity-0 translate-y-0"
                    )}
                  />
                }
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
