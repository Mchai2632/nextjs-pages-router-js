import Layout from "@/components/Layout";
import PackageList from "@/components/PackageList";
import { TourPkgListProvider } from "@/context/TourPkgListContext";

export default function Home() {
  return (
    <>
      <Layout>
        <TourPkgListProvider>
          <PackageList />
        </TourPkgListProvider>
      </Layout>
    </>
  );
}
