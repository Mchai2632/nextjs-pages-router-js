import useRenderCount from "@/hooks/useRenderCount";
import React, { useEffect, useRef, useState, useCallback, memo } from "react";

// ✅ Memo化圆圈组件，避免不必要 re-render
const ProgressStepCircle = memo(({ item, isStep }) => {
  // useRenderCount("ProgressStepCircle");
  return (
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
});

export default function ProgressBar({ stepList, step }) {
  const totalSteps = stepList.length;
  const containerRef = useRef(null);
  const firstCircleRef = useRef(null);
  const [size, setSize] = useState({ width: 0, circle: 0 });

  // useRenderCount("ProgressBar");

  // ✅ 计算尺寸（带防抖）
  const measure = useCallback(() => {
    if (!containerRef.current || !firstCircleRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const circleDiameter = firstCircleRef.current.offsetWidth;

    // 只有当尺寸真的变时才更新
    setSize((prev) => {
      if (prev.width !== containerWidth || prev.circle !== circleDiameter) {
        return { width: containerWidth, circle: circleDiameter };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(() => {
      // 使用 requestAnimationFrame 防止多次 setState
      requestAnimationFrame(measure);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measure]);

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

      {/* 圆圈 + Label */}
      <div className="flex justify-between items-center relative z-10">
        {stepList.map((item, i) => {
          const isStep = item.step <= step;
          return (
            <div
              key={item.step}
              ref={i === 0 ? firstCircleRef : null} // ✅ 拿第一个 circle 当尺寸基准
            >
              <ProgressStepCircle item={item} isStep={isStep} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
