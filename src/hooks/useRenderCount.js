import { useRef, useEffect } from "react";

/**
 * 追踪组件渲染次数（开发调试用）
 * @param {string} name - 组件名称
 */
export default function useRenderCount(name = "Component") {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log(`${name} render count:`, count.current);
  });
}
