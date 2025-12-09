import { useTourContext } from "@/context/TourContext";
import { CalendarDays, Clock8 } from "lucide-react";
import { useRouter } from "next/router";

export default function DetailsCard() {
  const router = useRouter();
  const { tourDepDetail } = useTourContext();

  const { idTourPkg, dtDep, tourPkg, tourTypeCode, code } = tourDepDetail;
  const { nameEn, imageUrl, numDays, numNights } = tourPkg;

  const handleChangeDates = () => {
    let path;
    if (tourTypeCode == "UMRAH") {
      path = "umrah";
    } else if (tourTypeCode == "TOUR") {
      path = "outbound";
    } else if (tourTypeCode == "INBOUND") {
      path = "inbound";
    } else {
      path = "outbound";
    }
    router.push(`${path}/${idTourPkg}`);
  };

  return (
    <div className="flex flex-col sm:flex-row h-fit shadow-xl mx-10 rounded-tl-2xl rounded-br-2xl overflow-hidden">
      {/* Images */}
      <div className="aspect-square h-[250px] ">
        {/* <img src={imageUrl} alt="img" /> */}
        <img src={imageUrl ? imageUrl : "/images/genting_dream_Sing_50.jpg"} alt="img" className="w-full h-full object-cover" />
        {/* <img src={imageUrl ? imageUrl : "https://placehold.co/400x400"} alt="img" className="w-full h-full object-cover" /> */}
      </div>
      <div className="flex flex-col gap-4 p-4 border-l border-l-gray-300">
        <h3>
          {numDays}D{numNights}N | {nameEn}
        </h3>
        <span className="flex gap-2">
          <Clock8 /> {numDays} HARI {numNights} MALAM
        </span>
        <div className="flex gap-2 items-start">
          <CalendarDays />
          <span>Selected Date: {dtDep}</span>
          <button className="text-red-500 cursor-pointer" onClick={handleChangeDates}>
            Change Dates
          </button>
        </div>
      </div>
    </div>
  );
}
