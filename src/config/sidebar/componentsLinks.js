import { Layout } from "lucide-react";

const COMPONENT_PAGE_SIDEBAR_LINKS = [
  // { label: "Home", href: "/" ,children :[{label: "Header", href: "/layout/header"}]},
  {
    title: "Layout",
    link: "/components/layout",
    children: [
      { title: "Header", link: "/layout/header" },
      { title: "Footer", link: "/layout/footer" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Sidebar", link: "/layout/sidebar" },
      { title: "Footer", link: "/layout/footer" },
    ],
  },
  {
    title: "General",
    link: "/components/general",
    children: [{ title: "Button", link: "/components/general/button" }],
  },
  {
    title: "Layout2",
    link: "/components/layout2",
  },
];

export default COMPONENT_PAGE_SIDEBAR_LINKS;
