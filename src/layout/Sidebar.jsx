import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { Home, User, Settings } from "lucide-react";
import { layoutConfig } from "@/config/RootLayoutConfig";
import Image from "next/image";
import { useState } from "react";

/**
 * Sidebar component
 * @param {Array} menuItems - Array of objects with label, href, and icon (optional)
 * @param {Boolean} showBrand - Whether to show the brand/logo or not
 * @returns {JSX.Element}
 */
export default function Sidebar({ menuItems = [], showBrand = false, className }) {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    <aside className={cn(`h-screen w-64 border-r bg-bg text-text p-4 flex flex-col`, className)}>
      {/* Brand / Logo */}
      {showBrand && (
        <Link href="/" className="text-xl font-bold">
          <Image src={layoutConfig.myBrand.logo} alt={layoutConfig.myBrand.name} width={100} height={100} />
        </Link>
      )}

      {/* Nav Links */}
      <ul className="space-y-2">
        {menuItems.map((item, i) => (
          <li key={i}>
            {/* 如果有 children，就用 button；否則用 Link */}
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="flex justify-between items-center w-full p-3 rounded-md hover:bg-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span> {item.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform transition-transform ${openMenus[item.title] ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 子選單 */}
                <div className={`overflow-hidden transition-all duration-500 ${openMenus[item.title] ? "max-h-40" : "max-h-0"}`}>
                  <ul className="ml-6 mt-2 space-y-1">
                    {item.children.map((child, j) => (
                      <li key={j}>
                        <Link href={child.link} className="block p-2 rounded-md text-sm hover:bg-primary transition-colors">
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link href={item.link} className="block p-3 rounded-md hover:bg-primary transition-colors flex items-center gap-2">
                <span>{item.icon}</span> {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
