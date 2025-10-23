import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { MoveUpRight } from "lucide-react";
import Tag from "./ui/Tag";
import ImageWithSkeleton from "./ui/ImageWithSkeleton";

export default function Card({ idTourPkg, cardTags }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={idTourPkg}
      className="w-fit shadow-lg p-4 m-4 border border-gray-200 rounded-lg"
    >
      {/* carousel img */}
      <div className="relative w-full h-56 md:h-66 lg:h-80">
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          {cardTags.map((tag, index) => {
            return <CardTag tagText={cardTags[index]} key={index} />;
          })}
        </div>

        <ImageWithSkeleton
          src="https://picsum.photos/400/200"
          alt="Tour Package"
          className="absolute top-0 -z-10 w-full h-full object-cover rounded-lg brightness-90"
        />
        {/* <img
          src="https://picsum.photos/400/200"
          alt="Tour Package"
          className="absolute top-0 -z-10 w-full h-full object-cover rounded-lg brightness-90"
        /> */}
      </div>

      {/* details */}
      <div className="flex mt-4 gap-4 ">
        <div className="flex-2">
          <h1 id="card_title">Petra.Jordan</h1>
          <p id="card_datetime" className="text-current/50 mb-2 text-sm">
            10 days, 6 nights
          </p>
          <p
            id="card_desc"
            className="line-clamp-2 text-current/50 mb-2 text-sm"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio est
            maxime ad? Inventore dolorum porro illum adipisci ducimus tempore
            amet.
          </p>
          <span id="card_price" className="font-bold">
            $1200 / night
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end justify-between text-primary">
          <Tag id="card_toprated" tagText="Top Rated" variant="outline" />
          <motion.button
            id="card_CTA"
            className="cursor-pointer flex text-text bg-primary items-center gap-2 px-4 py-2 rounded-full mt-4"
            onClick={() => router.push(`/wanderlust/${idTourPkg}`)}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-nowrap">View Details</span>
            <div className="bg-primary rounded-full p-2">
              <MoveUpRight />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const CardTag = ({ tagText }) => {
  return (
    <span className="bg-primary/70 text-text px-3 py-1 rounded-full text-sm">
      {tagText}
    </span>
  );
};
