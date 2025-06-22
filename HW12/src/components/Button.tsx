import React from "react";
import { motion } from "motion/react";

interface AnimateButton extends React.BaseHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}

const AnimateButton = ({
  children,
  className = "",
  isActive = false,
  ...rest
}: AnimateButton) => {
  return (
    <motion.button
      {...rest}
      className={`btn py-2 px-4 ${className}`}
      animate={{ scale: isActive ? 1.05 : 1 }}
      whileTap={{ scale: 0.95, y: 2 }}
      transition={{ type: "spring", stiffness: 1000 }}
    >
      {children}
    </motion.button>
  );
};
export default AnimateButton;
