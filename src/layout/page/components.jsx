import Layout from "@/layout/Layout";
import COMPONENT_PAGE_SIDEBAR_LINKS from "@/config/sidebar/componentsLinks";

export default function ComponentsWrapper({ children }) {
  return <Layout withSidebar={{ show: true, menuItems: COMPONENT_PAGE_SIDEBAR_LINKS }}>{children}</Layout>;
}
