import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { MoveUpRight, Star } from "lucide-react";
import Tag from "./ui/Tag";
import ImageWithSkeleton from "./ui/ImageWithSkeleton";
import Button from "./ui/Button/Button";
import { mediaConfig } from "@/config/mediaConfig";

export default function Card({ item, cardTags, action }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={item.idTourPkg}
      className="shadow-lg p-2 border border-border rounded-lg col-span-12 md:col-span-6 lg:col-span-4  "
    >
      {/* carousel img */}
      <div className="relative w-full aspect-[4/3]">
        <div className="absolute flex justify-between w-full px-4 top-4 z-10">
          <div className="flex flex-wrap gap-2">
            {cardTags.map((tag, index) => {
              return <CardTag tagText={cardTags[index]} key={index} />;
            })}
          </div>
          <span className="flex items-start text-on-primary gap-1 ">
            <Star className="fill-current" />
            4.8
          </span>
        </div>

        <ImageWithSkeleton
          src={item.imageUrl}
          alt={item.title}
          variant="cover"
          aspect="3/2"
          rounded="lg" // 圓角大小
          skeleton="shimmer" // skeleton 樣式 (pulse, shimmer)
        />

        {/* carousel dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          <span className="w-3 h-3 bg-primary/50  rounded-full backdrop-blur-md"></span>
          <span className="w-3 h-3 bg-primary/50  rounded-full backdrop-blur-md"></span>
          <span className="w-3 h-3 bg-primary  rounded-full backdrop-blur-md"></span>
        </div>
      </div>

      {/* details */}
      <div className="flex gap-4 p-4 pt-6">
        <div className="flex-2">
          <h5 id="card_title">Petra.Jordan</h5>
          <p id="card_datetime" className="text-muted mb-2 text-sm">
            10 days, 6 nights
          </p>
          <p id="card_desc" className="line-clamp-2 text-muted mb-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio est maxime ad? Inventore dolorum porro illum adipisci ducimus tempore amet.
          </p>
          <span id="card_price" className="font-bold text-xl text-primary">
            $1200 / night
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end justify-between text-primary">
          <Tag id="card_toprated" tagText="Top Rated" variant="outline" />
          <Button icon={MoveUpRight} onClick={action}>
            <span className="text-nowrap">View Details</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

const CardTag = ({ tagText }) => {
  return (
    <span
      className="
      text-on-primary 
      px-3 py-1 
      rounded-full 
      text-sm 
      shadow-md 
      hover:shadow-lg 
      transition-all 
      backdrop-blur-sm 
      text-shadow-md"
    >
      {tagText}
    </span>
  );
};
