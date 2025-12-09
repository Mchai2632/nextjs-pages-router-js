import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useRenderCount from "@/hooks/useRenderCount";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import VerticalSeparator from "@/components/ui/VerticalSeparator";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";

export default function Navbar({ logo = { src, alt: "Brand Logo" }, links, optionsStyle = { fixed }, className }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useRenderCount("Navbar");

  const optionsStyles = {
    fixed: optionsStyle.fixed,
  };

  return (
    <nav className={cn("w-full max-w-[1920px] z-50 px-6 py-4 flex justify-between items-center bg-bg text-text shadow-m", className, optionsStyles)}>
      {/* 品牌 LOGO */}
      <Link
        href="/"
        className="relative block"
        style={{ width: "150px", height: "70px" }} // 👈 必須給寬高
      >
        <Image src={logo.src} alt={logo.alt} priority fill style={{ objectFit: "contain" }} />
      </Link>
      {/* 桌面版 Menu */}
      <div className="hidden md:flex ">
        {links.map(({ label, href, icon: Icon }, index) => {
          const active = pathname === href;
          const lengthoflinks = links.length;

          return (
            <div className="relative" key={href}>
              <Link href={href} className={`flex items-center px-4 text-lg hover:text-primary ${active ? "text-primary " : ""}`}>
                {Icon && <Icon className="h-4 w-4" />} <span>{label}</span>
              </Link>
              {!(index === lengthoflinks - 1) && <VerticalSeparator height="80%" />}
            </div>
          );
        })}
      </div>

      <ThemeToggleButton />

      {/* 漢堡按鈕 (mobile) */}
      <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <Button onClick={() => router.push("/login")}>Log in</Button>

      {/* 手機版 Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[102px] left-0 w-full bg-bg text-text shadow-md shadow-shadow md:hidden flex flex-col items-center gap-4 py-6 "
          >
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg hover:text-primary ${active ? "text-primary" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
