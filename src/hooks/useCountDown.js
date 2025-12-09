import { useEffect, useRef, useState } from "react";

/**
 * useCountdown
 * 手动控制的倒计时 Hook（支持开始 / 暂停 / 重置）
 *
 * @param {number} initialMinutes - 倒计时起始分钟（默认 30）
 * @returns {{
 *   timeLeft: number,          // 剩余秒数
 *   formatted: string,         // 格式化后的时间字串 (MM:SS)
 *   start: Function,           // 开始倒计时
 *   pause: Function,           // 暂停倒计时
 *   reset: Function,           // 重置为初始时间
 *   isActive: boolean          // 当前是否正在倒计时中
 * }}
 */
export default function useCountdown(initialMinutes = 30) {
  // 存储剩余时间（单位：秒）
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  // 是否正在倒计时
  const [isActive, setIsActive] = useState(false);

  // 保存定时器的引用，用来清除 interval
  const timerRef = useRef(null);

  /**
   * 倒计时核心逻辑：
   * 当 isActive 为 true 时，每秒执行一次 setTimeLeft
   */
  useEffect(() => {
    if (!isActive) return; // 若未启动则不执行任何逻辑

    // 启动 interval，每 1 秒执行一次
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // 若倒计时结束（剩余 ≤ 1 秒）
        if (prev <= 1) {
          clearInterval(timerRef.current); // 停止计时
          setIsActive(false); // 设置为未激活状态
          return 0;
        }
        return prev - 1; // 每秒减少 1 秒
      });
    }, 1000);

    // 组件卸载或暂停时清除 interval
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  // 格式化输出 (MM:SS)
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // 启动倒计时（仅当有剩余时间时）
  const start = () => {
    if (timeLeft > 0) setIsActive(true);
  };

  // 暂停倒计时
  const pause = () => setIsActive(false);

  // 重置倒计时至初始值
  const reset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(initialMinutes * 60);
    setIsActive(false);
  };

  // 返回 Hook 可用的状态与控制方法
  return { timeLeft, formatted: `${minutes}:${seconds}`, start, pause, reset, isActive };
}
