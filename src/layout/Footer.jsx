import React from "react";
import { motion } from "motion/react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

// { links = [], showBrand = false, className }

export default function Footer({ showBrand = true, brandName = "YourBrand", links = [], socials = [] }) {
  // console.log(links);
  // console.log(socials);

  return (
    <footer className=" bg-bg text-text border-t border-muted py-10 px-6">
      {/* 上半部：品牌與導覽 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 品牌資訊 */}
        <div>
          {showBrand && <h2 className="text-xl font-bold text-primary mb-2">{brandName}</h2>}
          <p className="text-sm text-text-muted">Bringing you the best travel experiences with modern design and innovation.</p>
        </div>

        {/* 快速導覽 */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 聯絡或社交 */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {socials.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-bg-light rounded-full hover:bg-primary hover:text-bg-dark transition-colors duration-300"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 下半部：版權區 */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </footer>
  );
}
