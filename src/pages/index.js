// import Layout from "@/components/Layout";
import PackageList from "@/components/PackageList";
import { TourPkgListProvider } from "@/context/TourPkgListContext";

// hooks
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

// i18n
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// animation
import { motion } from "motion/react";
import RootWrapper from "@/layout/page/root";
import { forwardRef, useEffect, useRef } from "react";
import Orbit from "@/components/ui/Orbit";
import Gallery from "@/components/Home/Gallery";

export default function HomePage() {
  // Auto refresh page every 5 seconds in development mode
  // useAutoRefresh(5000);

  // const radius = 200 / 2;

  const radius = 150;
  const cx = 200;
  const cy = 200;
  const n = 10;

  return (
    <>
      <RootWrapper>
        {/* <HeroSection2 /> */}
        {/* <HeroSection3 /> */}
        {/* <HeroSection /> */}
        {/* <VisionScroll3D /> */}

        <Gallery />

        <section className="relative w-full flex bg-bg text-text">
          <div className="w-1/2 flex gap-2 flex-col justify-center items-center">
            <h1>TESTIMONIALS</h1>
            <hr className="w-[10%]" />
            <p>Let’s see what our customers say !</p>
          </div>
          <div className="relative w-1/2 overflow-hidden">
            <div className="absolute w-full h-full bg-linear-to-r from-transparent to-orange-400/50"></div>
            {/* <div className="z-20 absolute w-full h-[30%] bg-black/20 "></div> */}
            <Orbit direction={0} />
            <div className="absolute h-full w-full top-0 blur-mask  pointer-events-none" />
          </div>
        </section>
        {/* 
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <div className="bg-red-500 w-50 h-50"></div>

          <div className="border" style={{ width: width, height: height }}>
            <div className="bg-blue-500 " style={{ width: 200 / 2, height: 200 }}></div>
          </div>

          <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="50" fill="red" />
          </svg>
        </div> */}

        {/* <TourPkgListProvider>
          <PackageList />
        </TourPkgListProvider> */}
      </RootWrapper>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
};

// eslint-disable-next-line react/display-name
const DateInput = forwardRef(function (props, ref) {
  /*
    props 
      -title: string
      -onChange: fn
      -id: string
      ref : ref
      -required:boolean
  */
  return (
    <div className="w-100 input-box-2">
      <label htmlFor="exampleInput" className="form-label input-label fw-bold mt-3">
        {props.title}
        {props.required ? (
          <span className="text-red-600">
            <sup>*</sup>
          </span>
        ) : null}
      </label>
      <input type="date" className="form-control input-box" {...props} ref={ref} />
    </div>
  );
});
