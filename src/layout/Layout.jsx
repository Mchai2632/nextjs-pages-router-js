import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { cn } from "@/utils/cn";
import { layoutConfig } from "@/config/RootLayoutConfig";
import { useTheme } from "@/context/ThemeContext";
const { NAVBAR_LINKS, FOOTER_LINKS } = layoutConfig;

// config data

export default function Layout({
  children,
  variant = "default",
  navBar = {
    isFixed: false,
  },
  withFooter = { show: false, showBrand: true, links: FOOTER_LINKS.quickLinks, socials: FOOTER_LINKS.socials },
  withSidebar = { show: false, showBrand: false, menuItems: [] },
  className,
}) {
  const { theme, logo } = useTheme();

  // ✅ 預設值與傳入值合併
  const mergedFooter = {
    show: false,
    showBrand: true,
    links: layoutConfig.FOOTER_LINKS.quickLinks,
    socials: layoutConfig.FOOTER_LINKS.socials,
    ...withFooter, // 傳入值會覆蓋預設值
  };

  const mergedSidebar = {
    show: false,
    showBrand: false,
    menuItems: [],
    ...withSidebar,
  };

  return (
    <div className={cn("relative min-h-screen flex flex-col max-w-[1920px] mx-auto", className)}>
      <Navbar
        showBrand={true}
        logo={{ src: logo, alt: layoutConfig.myBrand.name }}
        links={NAVBAR_LINKS}
        optionsStyle={{
          fixed: navBar.isFixed,
        }}
      />
      <div className="flex flex-1 bg-bg">
        {mergedSidebar.show && (
          <Sidebar showBrand={mergedSidebar.showBrand} menuItems={mergedSidebar.menuItems} className={navBar.isFixed && "navBarIsFixed"} />
        )}
        <main className={`w-full ${navBar.isFixed && "navBarIsFixed"}`}>{children}</main>
      </div>
      {mergedFooter.show && (
        <Footer showBrand={mergedFooter.showBrand} brandName={layoutConfig.myBrand.name} links={mergedFooter.links} socials={mergedFooter.socials} />
      )}
    </div>
  );
}
