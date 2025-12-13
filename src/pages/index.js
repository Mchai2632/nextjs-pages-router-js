// hooks
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

// i18n
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// animation
import { motion } from "motion/react";
import RootWrapper from "@/layout/page/root";
import { forwardRef } from "react";

import Gallery from "@/components/Home/Gallery";
import Testimonials from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Newsletter";

export default function HomePage() {
  // Auto refresh page every 5 seconds in development mode
  // useAutoRefresh(5000);

  return (
    <>
      <RootWrapper>
        {/* <HeroSection2 /> */}
        {/* <HeroSection3 /> */}
        {/* <HeroSection /> */}
        {/* <VisionScroll3D /> */}

        <Gallery />
        <Testimonials />
        <Newsletter />

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
