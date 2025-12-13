import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Star, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// direction = 0 = clockwise
// direction = 1 = anti-clockwise

export default function Orbit({ direction = 0, stop = false }) {
  const width = useWindowWidth();

  const n = 6;
  const radius = 400;
  const rx = 550; // X 轴半径
  const ry = 300; // Y 轴半径
  const cx = width / 2;
  const cy = 400;
  const pointsRef = useRef([]);

  useEffect(() => {
    let offset = 0; // 全局角度偏移
    const speed = stop ? 0 : 0.002; // 每帧移动速度（越大越快）

    function animate() {
      if (direction == 0) {
        offset += speed;
      } else if (direction == 1) {
        offset -= speed;
      } else {
        offset += speed;
      }

      pointsRef.current.forEach((el, i) => {
        if (!el) return;
        const baseAngle = (2 * Math.PI * i) / n;
        const a = baseAngle + offset;

        // 圆形轨道
        // const x = cx + radius * Math.cos(a);
        // const y = cy + radius * Math.sin(a);

        // 椭圆轨道
        const x = cx + rx * Math.cos(a);
        const y = cy + ry * Math.sin(a);

        el.style.left = x + "px";
        el.style.top = y + "px";
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="relative mx-auto w-full h-fit" style={{ width: cx * 2, height: cy * 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (pointsRef.current[i] = el)}
          className="absolute w-fit h-fit  rounded-full -translate-y-1/2 -translate-x-1/2 text-white flex items-center justify-center"
        >
          <Card />
        </div>
      ))}
    </div>
  );
}

function Card() {
  return (
    <div className="relative w-[424px] h-fit bg-white text-black rounded-4xl pt-[75px] px-[25px] pb-[15px] shadow-md">
      {/* upper */}
      <div className="flex gap-4 absolute -top-[17%] left-1/2 -translate-x-1/2 items-center">
        {/* image */}
        <div className="relative w-[100px] h-[100px] rounded-full bg-gray-300">
          <div className="w-full h-full p-4">
            <User className="h-full w-full" />
          </div>
        </div>
        <div className="flex items-center gap-4 pt-10">
          <div>
            <div className="font-bold">Michael</div>
            <div className="text-xs text-text-muted">Taiwan</div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} fill="currentColor" className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="line-clamp-3 ">
        Just returned from a fantastic trip to Guilin with Golden Signature and couldn’t be happier. The itinerary was well-planned, covering all the must-see
        sights like the stunning River cruise and the picturesque Rice Terraces.
      </div>
    </div>
  );
}
