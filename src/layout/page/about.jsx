import Layout from "@/layout/Layout";

export default function AboutWrapper({ children }) {
  return (
    <Layout
      withFooter={{
        show: true,
      }}
    >
      {children}
    </Layout>
  );
}
