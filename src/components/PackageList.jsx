import { useTourPkgListData } from "@/context/TourPkgListContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import Card from "./Card";
import Loading from "./ui/Loading";
import EmptyState from "./ui/EmptyState";
import { Inbox } from "lucide-react";
import Button from "./ui/Button/Button";

const cardTags = ["Adventure", "Ancient Monuments", "Hiking", "Cultural"];
const typeCdList = ["TOUR", "INBOUND", "OUTBOUND", "UMRAH"];

export default function PackageList() {
  const router = useRouter();

  const [onSearchTourPkgs, setOnSearchTourPkgs] = useState(null);

  // get tour package list data from context
  const { tourPkgList, typeCd, setTypeCd, loading } = useTourPkgListData();

  console.log(tourPkgList);

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

    const filteredList = tourPkgList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

    setOnSearchTourPkgs(filteredList);
    // console.log("Filtered List: ", filteredList);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full mb-4">
        <h1>Choose tour type: </h1>
        <div>
          {typeCdList.map((item, index) => {
            return (
              <span key={index} className={`${typeCd === item ? "bg-amber-400" : ""}`} onClick={() => setTypeCd(item)}>
                {item}
              </span>
            );
          })}
        </div>
        <hr /> <SearchBar placeholder="Search by package name" onSearch={handleOnSearch} />
      </div>
      {/* All the Packages */}
      <div className="col-span-full">
        {loading ? (
          <Loading text="Loading packages..." />
        ) : (
          <>
            {/* if got tour package list data, show the list of packages */}
            {onSearchTourPkgs?.length > 0 && (
              <div className="grid grid-cols-12 gap-4">
                {onSearchTourPkgs?.map((item, index) => {
                  return <Card key={index} item={item} cardTags={cardTags} action={() => router.push(`/${typeCd.toLowerCase()}/${item.idTourPkg}`)} />;
                })}
              </div>
            )}
            {/* if no tour package found, show empty state */}
            {onSearchTourPkgs?.length === 0 && (
              <EmptyState
                icon={Inbox}
                title="No Tours Package Found"
                description="Try changing your search filters."
                action={<Button>Create New Tour</Button>}
              />
            )}
          </>
        )}
      </div>{" "}
    </div>
  );
}
