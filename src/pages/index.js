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

const schemaForm = {
  name: {
    label: "Name",
    key: "name", // use for register
    required: false,
    errorMsg: "Name is required !",
    defaultValue: "",
  },
};

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
