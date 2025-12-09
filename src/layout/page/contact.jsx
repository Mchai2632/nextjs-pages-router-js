import Layout from "@/layout/Layout";

export default function ContactWrapper({ children }) {
  return <Layout withFooter={{ show: true }}>{children}</Layout>;
}
