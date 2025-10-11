import React, { useEffect, useRef, useState } from "react";

function useRenderCount(name) {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
    console.log(`${name} render count:`, count.current);
  });
}

const ProgressStepCircle = ({ item, isStep }) => (
  <div className="flex flex-col items-center relative z-10">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
        isStep
          ? "bg-primary text-background"
          : "bg-background border border-inactive text-inactive"
      }`}
    >
      {item.step}
    </div>
    <span
      className={`mt-2 text-sm ${
        isStep ? "text-primary font-semibold" : "text-inactive"
      }`}
    >
      {item.name}
    </span>
  </div>
);

export default function ProgressBar({ stepList, step }) {
  const totalSteps = stepList.length;
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, circle: 0 });

  useRenderCount("ProgressBar");

  // 🔹 自动侦测容器宽度变化
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const circle = containerRef.current.querySelector(".w-10");
      const circleDiameter = circle ? circle.offsetWidth : 40;

      setSize({ width: containerWidth, circle: circleDiameter });
    };

    // 初次测量
    measure();

    // ResizeObserver 侦测变化
    const observer = new ResizeObserver(measure);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const circleRadius = size.circle / 2;
  const trackWidth = size.width - size.circle;
  const progressPx =
    totalSteps > 1 ? ((step - 1) / (totalSteps - 1)) * trackWidth : 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 背景线 */}
      <div
        className="absolute top-[20px] h-1 bg-inactive -translate-y-1/2 rounded-full"
        style={{
          left: `${circleRadius}px`,
          width: `calc(100% - ${size.circle}px)`,
        }}
      ></div>

      {/* 动态进度线 */}
      <div
        className="absolute top-[20px] h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
        style={{
          left: `${circleRadius}px`,
          width: `${progressPx}px`,
        }}
      ></div>

      {/* 圆圈 + label */}
      <div className="flex justify-between items-center relative z-10">
        {stepList.map((item) => {
          const isStep = item.step <= step;
          return (
            <ProgressStepCircle key={item.step} item={item} isStep={isStep} />
          );
        })}
      </div>
    </div>
  );
}
