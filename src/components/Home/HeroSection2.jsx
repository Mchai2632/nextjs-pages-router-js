import React, { useRef, useState } from "react";

const imgList = [
  {
    name: "Makima",
    url: [
      "https://i.pinimg.com/1200x/5d/c7/9b/5dc79b8d7257766abf04a9cf695f41ef.jpg",
      "https://i.pinimg.com/1200x/29/be/f5/29bef5ab15d79dce72b745c5f6a10d95.jpg",
      "https://i.pinimg.com/736x/82/38/4c/82384cade2a6a284045cc45344896325.jpg",
      "https://i.pinimg.com/736x/c7/0c/04/c70c04eebc61204a384b215d6d14a9d1.jpg",
      "https://i.pinimg.com/736x/7f/9a/b7/7f9ab76d176500704b5ebb3e73848653.jpg",
      "https://i.pinimg.com/1200x/87/9d/91/879d91740693a6d491dc52b9488e5eed.jpg",
      "https://i.pinimg.com/736x/92/79/6f/92796fb982e30b8207c89a5b9ba4808c.jpg",
      "https://i.pinimg.com/736x/9e/8c/48/9e8c48f7a69684032472228e6c17acc6.jpg",
    ],
  },
  {
    name: "other",
    url: [
      "https://i.pinimg.com/736x/df/81/b8/df81b83cc51a1a7a1ce72bbd937d0906.jpg",
      "https://i.pinimg.com/1200x/27/c3/d8/27c3d8681cdcf9d40a03cd107a7e1428.jpg",
      "https://i.pinimg.com/736x/dc/53/73/dc5373b88552ba6eee22ea3099afbb0b.jpg",
    ],
  },
];

export default function HeroSection2() {
  const [isHover, setIsHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const lastTime = useRef(0);

  // PointerDown
  const handleDown = (e) => {
    startX.current = e.clientX;
    scrollStart.current = containerRef.current.scrollLeft;
    isDragging.current = true;
    lastTime.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // PointerMove
  const handleMove = (e) => {
    if (!isDragging.current) return;

    const delta = startX.current - e.clientX;
    containerRef.current.scrollLeft = scrollStart.current + delta;

    // 计算速度
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = delta / dt; // px/ms
      lastTime.current = now;
      scrollStart.current = containerRef.current.scrollLeft;
      startX.current = e.clientX;
    }
  };

  // PointerUp
  const handleUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // 惯性滚动
    const decay = 0.95; // 摩擦系数
    const animate = () => {
      if (Math.abs(velocity.current) < 0.01) return; // 停止条件
      containerRef.current.scrollLeft += velocity.current * 16; // 16ms 一帧
      velocity.current *= decay;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <section className="home-background relative w-full py-52">
      <div className="relative z-1">
        <div
          ref={containerRef}
          className="relative flex gap-4 overflow-x-scroll scrollbar-hidden py-4"
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
        >
          {imgList[0].url.map((item, i) => {
            const imgLength = imgList[0].url.length;
            // console.log(i, "==", imgLength);

            const center = imgLength / 2;

            // 每张图根据“离中心的距离”自动计算 perspective
            const level = Math.abs(i - center); // 离中心越远 level 越大
            // console.log("level:", level);

            const perspectiveValue = 800 - level * 300;

            return (
              <div
                className={`min-w-50 h-50  p-2 rounded-xl transition-all ${isHover && hoveredItem == i ? "ring-1 inset-1.5" : ""}`}
                style={{ perspective: perspectiveValue }}
                onMouseEnter={() => {
                  setIsHover(true);
                  setHoveredItem(i);
                }}
                onMouseLeave={() => setIsHover(false)}
                key={i}
              >
                <img
                  src={item}
                  alt=""
                  className={`w-full h-full object-cover transition ease-in-out shadow rounded-xl hover:scale-105 `}
                  // style={{
                  //   transform: `rotateY(${isHover && i === hoveredItem ? 0 : i >= imgLength / 2 ? -40 : 40}deg)`,
                  // }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none top-0 absolute bg-linear-to-r from-background/70  h-full w-[20%]"></div>
        <div className="pointer-events-none top-0 absolute right-0 bg-linear-to-l from-background/70  h-full w-[20%]"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-2xl"></div>
    </section>
  );
}
