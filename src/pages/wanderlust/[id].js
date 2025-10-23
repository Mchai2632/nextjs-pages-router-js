import Layout from "@/components/Layout";
import useTourPkgDetail from "@/hooks/api/useTourPkgDetail";
import { useRouter } from "next/router";
import React from "react";

// i18n
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function WanderlustDetail() {
  const router = useRouter();
  const idTourPkg = router.query.id;
  const isReady = router.isReady; // ✅ 確保 router 已準備好

  const { tourPkgDetail, loading, error } = useTourPkgDetail(
    isReady ? idTourPkg : null
  );

  if (!isReady || loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!tourPkgDetail) return <p>No data found</p>;

  return (
    <Layout>
      <div>
        <div>{tourPkgDetail.nameEn}</div>
        <span>{tourPkgDetail.idBase}</span>

        <h1>this package have this departures time : </h1>
        {tourPkgDetail.tourDepList.map((tour) => {
          // console.log(tour);
          return (
            <div key={tour.idBase}>
              <div></div>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/booking-tour",
                    query: {
                      idBase: tour.idBase,
                      idCompany: tourPkgDetail.idCompany,
                      idTourPkg: idTourPkg,
                    },
                  });
                }}
              >
                {tour.idBase} book now
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
