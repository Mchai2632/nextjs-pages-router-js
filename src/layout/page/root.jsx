import Layout from "@/layout/Layout";
import React from "react";

export default function RootWrapper({ children }) {
  return <Layout withFooter={{ show: true }}>{children}</Layout>;
}
