import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>RA Group Travel & Tours</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <nav></nav>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
