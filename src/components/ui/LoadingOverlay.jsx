import { motion, AnimatePresence } from "motion/react";
import { useLoadingContext } from "@/context/LoadingContext";
import Button from "./Button/Button";

export default function LoadingOverlay() {
  const { loadingConfig, hide } = useLoadingContext();
  const { isOpen, text, size, color } = loadingConfig;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="
      fixed inset-0 z-[9999]
      flex flex-col items-center justify-center
      bg-black/50 backdrop-blur-sm
    "
        initial={false}
        animate={isOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.2 }}
      >
        {/* Spinner */}
        <motion.div
          className="rounded-full border-4 border-t-transparent animate-spin"
          style={{
            width: size,
            height: size,
            borderColor: color,
            borderTopColor: "transparent",
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
        />

        {/* Text */}
        <motion.div className="mt-4 text-white text-lg font-medium" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          {text}
        </motion.div>
        {process.env.NEXT_PUBLIC_NODE_ENV === "development" && <Button onClick={() => hide()}>Hide Loading</Button>}
      </motion.div>
    </AnimatePresence>
  );
}
