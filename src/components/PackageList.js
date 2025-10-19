import { useTourPkgListData } from "@/context/TourPkgListContext";
import { useRouter } from "next/router";
import React from "react";

export default function PackageList() {
  const { typeCdList, setTypeCd, tourPkgList } = useTourPkgListData();

  const router = useRouter();

  return (
    <div>
      <h1>choose tour type: </h1>
      <div>
        {typeCdList.map((item, index) => {
          return (
            <span key={index} onClick={() => setTypeCd(item)}>
              {item}
            </span>
          );
        })}
      </div>
      <hr />
      {/* All the Packages */}
      <div className="grid grid-cols-3">
        {tourPkgList.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-amber-300 w-[300px] h-[100px]"
              onClick={() => router.push(`/wanderlust/${item.idTourPkg}`)}
            >
              <span>{item.idTourPkg}</span>
              <span>View Details</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
