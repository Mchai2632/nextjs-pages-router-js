import React from "react";
import { motion } from "motion/react";
import { LoaderCircle, Star } from "lucide-react";

const Loading = (props) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity, // 無限重播
          repeatType: "reverse", // 反向來回動
        }}
      >
        <LoaderCircle />
      </motion.div>
      <h3> {props?.text || ""} </h3>
    </div>
  );
};

export default Loading;
