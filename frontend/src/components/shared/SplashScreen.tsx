import { motion } from "framer-motion";
import logo from "@/assets/logo/logo.png";
const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logo}
        alt="IEIT"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="w-32 sm:w-40"
      />
    </motion.div>
  );
};

export default SplashScreen;
