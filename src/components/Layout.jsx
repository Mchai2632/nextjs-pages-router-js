import Head from "next/head";
import React from "react";
import Navbar from "./ui/Navbar";

// config data
import { navItems } from "@/config/RootLayoutConfig";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Next.js Pages Router</title>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <Navbar navItems={navItems} />
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
