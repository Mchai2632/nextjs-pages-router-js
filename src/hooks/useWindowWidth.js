import { useState, useEffect } from "react";

/**
 * useWindowWidth Hook
 * 返回当前窗口宽度
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // 初始化一次
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
