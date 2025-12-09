import COMPONENT_PAGE_SIDEBAR_LINKS from "@/config/sidebar/componentsLinks";
import Layout from "@/layout/Layout";

export default function GeneralWrapper({ children }) {
  return <Layout withSidebar={{ show: true, menuItems: COMPONENT_PAGE_SIDEBAR_LINKS }}>{children}</Layout>;
}
