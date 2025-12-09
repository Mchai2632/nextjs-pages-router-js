import React from "react";

// hooks
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

// i18n
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/layout/Layout";

export default function Wanderlust() {
  // useAutoRefresh(5000);
  return (
    <Layout>
      <div>Wanderlust Home Page</div>
    </Layout>
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
