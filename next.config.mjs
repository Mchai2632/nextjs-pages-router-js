/** @type {import('next').NextConfig} */
import nextI18NextConfig from "./next-i18next.config.js";

const nextConfig = {
  reactStrictMode: false,
  i18n: nextI18NextConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trevabook.ddns.net",
        port: "",
        pathname: "/trevabook-admin/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "nuhtravel.ddns.net",
        port: "",
        pathname: "/nuhtravel-admin/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
