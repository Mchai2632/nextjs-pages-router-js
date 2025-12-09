import { useState } from "react";
import { cn } from "@/utils/cn"; // 👈 你專案裡已經有這個工具

/**
 * 通用圖片元件：支援 skeleton、比例、cover/contain
 *
 * @param {string} src - 圖片網址
 * @param {string} alt - 圖片說明
 * @param {string} variant - 圖片顯示方式: "cover" | "contain" | "fill"
 * @param {string} aspect - 圖片比例: "16/9" | "4/3" | "1/1" | "auto"
 * @param {string} rounded - 圓角: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
 * @param {string} skeleton - 載入動畫: "pulse" | "shimmer"
 * @param {string} className - 額外樣式
 */
export default function ImageWithSkeleton({ src, alt = "", variant = "cover", aspect = "auto", rounded = "lg", skeleton = "pulse", className, ...props }) {
  const [loading, setLoading] = useState(true);

  // Skeleton 樣式
  const skeletonClass =
    skeleton === "shimmer"
      ? "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
      : "bg-gray-300 animate-pulse";

  return (
    <div className={cn("relative overflow-hidden w-full", aspect !== "auto" && `aspect-[${aspect}]`, rounded !== "none" && `rounded-${rounded}`, className)}>
      {/* Skeleton Loading */}
      {loading && <div className={cn("absolute inset-0", skeletonClass, rounded !== "none" && `rounded-${rounded}`)} />}

      {/* 真實圖片 */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100",
          {
            "object-cover": variant === "cover",
            "object-contain": variant === "contain",
            "object-fill": variant === "fill",
          },
          rounded !== "none" && `rounded-${rounded}`
        )}
        {...props}
      />
    </div>
  );
}

/**
 * shimmer 動畫 (Tailwind 補充)
 * 你可以在 global.css 裡加這段：
 *
 * @keyframes shimmer {
 *   0% { background-position: -200% 0; }
 *   100% { background-position: 200% 0; }
 * }
 */

// 🧪 使用範例
// 1️⃣ 預設用法（card 圖片）
// <ImageWithSkeleton
//   src="https://placehold.co/600x400"
//   alt="Tour Package"
//   aspect="4/3"
//   rounded="lg"
// />

// 2️⃣ Hero Banner
// <ImageWithSkeleton
//   src="/images/hero.jpg"
//   alt="Hero"
//   variant="cover"
//   aspect="16/9"
//   skeleton="shimmer"
// />

// 3️⃣ Logo 或 Icon
// <ImageWithSkeleton
//   src="/logo-light.svg"
//   alt="Brand Logo"
//   variant="contain"
//   rounded="none"
//   aspect="auto"
// />
