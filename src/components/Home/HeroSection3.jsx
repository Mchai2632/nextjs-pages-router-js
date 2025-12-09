import Spline from "@splinetool/react-spline";
import React, { useEffect, useRef, useState } from "react";

export default function HeroSection3() {
  const spline = useRef();
  const objectToAnimate = useRef();
  const [isInView, setIsInView] = useState(false);

  const getY = useRef();

  // 监听窗口宽度变化
  useEffect(() => {
    const handleScroll = (e) => {
      // console.log("x:", objectToAnimate.current.rotation.x);
      // console.log("y:", objectToAnimate.current.rotation.y);
      // const scrollY = window.scrollY;
      // console.log(scrollY);
      // if (!getY.current) return;
      // const y = getY.current.getBoundingClientRect();
      // // console.log("scrollY:", scrollY, "y:", y.top, "innerHeight:", window.innerHeight);
      // const inView = y.top < 0;
      // setIsInView(inView);
      // // objectToAnimate.current.rotation.y = scrollY * 0.004; // 左右旋转
      // objectToAnimate.current.rotation.y = scrollY * 0.002; // 上下微动
      // console.log(window.scrollY);
    };

    window.addEventListener("scrollend", handleScroll);
    return () => window.removeEventListener("scrollend", handleScroll);
  }, []);

  function onLoad(splineApp) {
    const obj = splineApp.findObjectById("0c919997-2b3c-42c0-a34e-ba4621e98016");

    console.log(splineApp.variables);
    console.log("splineApp:", splineApp);

    spline.current = splineApp;
    objectToAnimate.current = obj;
  }

  return (
    <section className="home-background relative w-full min-h-screen">
      <Spline className="flex justify-center" onLoad={onLoad} scene="https://prod.spline.design/cou9-hXgmMV2e3N5/scene.splinecode" />
      <button
        onClick={() => {
          spline.current.setVariables({ black: 100, white: 0 });
        }}
      >
        black
      </button>{" "}
      <button
        onClick={() => {
          spline.current.setVariables({ black: 0, white: 100 });
        }}
      >
        white
      </button>
      {/* <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
        <span className="text-[175px]">CUBE 3D</span>
      </div>

      <div ref={getY} className="h-[200vh] relative">
        <div className="sticky top-0 ">
          <Spline className="flex justify-center" onLoad={onLoad} scene="https://prod.spline.design/cou9-hXgmMV2e3N5/scene.splinecode" />
        </div>
      </div> */}
    </section>
  );
}
