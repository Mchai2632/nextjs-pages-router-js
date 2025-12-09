import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  // 監聽 ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // 若未開啟，不 render
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // 點背景關閉
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // 阻止事件冒泡
      >
        {/* 標題區域 */}
        {title && <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>}

        {/* 內容 */}
        <div>{children}</div>
      </div>

      {/* 簡單的淡入動畫 */}
      <style>{`
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
    </div>,
    document.body // 放在 root 之外
  );
}
