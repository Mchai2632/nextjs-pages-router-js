import { useTourPkgListData } from "@/context/TourPkgListContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import Card from "./Card";

const cardTags = ["Adventure", "Ancient Monuments", "Hiking", "Cultural"];

export default function PackageList() {
  const router = useRouter();

  const [onSearchTourPkgs, setOnSearchTourPkgs] = useState(null);

  // get tour package list data from context
  const { typeCdList, typeCd, setTypeCd, tourPkgList, loading } =
    useTourPkgListData();

  // update tour package list data when context changes
  useEffect(() => {
    setOnSearchTourPkgs(tourPkgList);
  }, [tourPkgList]);

  // handle search
  const handleOnSearch = (query) => {
    if (!query) {
      setOnSearchTourPkgs(tourPkgList);
      return;
    }

    const filteredList = tourPkgList.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setOnSearchTourPkgs(filteredList);
    // console.log("Filtered List: ", filteredList);
  };

  return (
    <div>
      <h1>Choose tour type: </h1>
      <div>
        {typeCdList.map((item, index) => {
          return (
            <span
              key={index}
              className={`${typeCd === item ? "bg-amber-400" : ""}`}
              onClick={() => setTypeCd(item)}
            >
              {item}
            </span>
          );
        })}
      </div>
      <hr />
      {/* All the Packages */}

      <SearchBar
        placeholder="Search by package name"
        onSearch={handleOnSearch}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,_minmax(365px,_1fr))]">
          {onSearchTourPkgs?.map((item, index) => {
            return (
              <Card
                key={index}
                idTourPkg={item.idTourPkg}
                cardTags={cardTags}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
