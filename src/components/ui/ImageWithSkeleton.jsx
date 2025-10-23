import { useState } from "react";

export default function ImageWithSkeleton({ src, alt, className }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton */}
      {loading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full rounded-lg object-cover ${
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
