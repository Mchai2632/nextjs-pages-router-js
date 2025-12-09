import BaseMeta from "@/components/SEO/BaseMeta";
import PageSEO from "@/components/SEO/PageSEO";
import ComponentsWrapper from "@/layout/page/components";
import Head from "next/head";
import React from "react";

export default function ComponentsPage({ children }) {
  return (
    <>
      <BaseMeta description={"asdbsahd"}></BaseMeta>
      <ComponentsWrapper>Component Index Page</ComponentsWrapper>
    </>
  );
}
