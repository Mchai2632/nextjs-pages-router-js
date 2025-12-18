import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BannerCarousel2({ images, autoSlide = false, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const containerCarousel = useRef();

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoSlide, interval, index]);

  const next = () => {
    if (index >= images.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index <= 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-hidden relative text-text">
      <div
        ref={containerCarousel}
        className="relative w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * containerCarousel.current?.offsetWidth}px)` }}
      >
        {images.map((image, i) => {
          return (
            <div className="relative w-full flex-shrink-0 aspect-75/32">
              <Image alt={`image_${i}`} key={i} src={image} width={1920} height={1080} className="object-cover w-full h-full" priority={i === 0} />

              {/* overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/40 to-20%"></div>
              <div className="absolute inset-0 bg-linear-to-l from-black/40 to-20%"></div>
            </div>
          );
        })}
      </div>

      <DirectionButton
        Icon={ArrowLeft}
        onClick={prev}
        className="absolute"
        style={{
          top: "calc(50% - 16px)",
          left: 12,
        }}
      ></DirectionButton>
      <DirectionButton
        Icon={ArrowRight}
        className="absolute"
        style={{
          top: "calc(50% - 32px)",
          right: 12,
        }}
        onClick={next}
      ></DirectionButton>

      {/* dots */}
      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: images.length }, (_, i) => (
          <div
            className={cn("w-4 h-4 rounded-full transition-transform", i === index ? "bg-primary" : "bg-gray-500", i < index || i > index ? "scale-75" : "")}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}

const DirectionButton = ({ onClick, Icon, className = "", style, ...props }) => {
  return (
    <button
      className={cn("bg-primary/70 shadow-s hover:scale-125 transition-transform duration-300 rounded-full p-2 cursor-pointer", className)}
      style={style}
      onClick={onClick}
      {...props}
    >
      <Icon className="text-current" />
    </button>
  );
};
