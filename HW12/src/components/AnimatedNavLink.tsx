import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import classes from "./AnimationNavLink.module.css";
import type React from "react";

const AnimatedNavLink: React.FC<{ to: string; label: string }> = ({
  to,
  label,
}) => {
  const location = useLocation();

  const isActive =
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`nav-link px-2 ${isActive ? "active" : ""}`}
    >
      {({ isActive }) => (
        <span className="position-relative d-inline-block">
          <span className="z-1 position-relative">{label}</span>
          {isActive && (
            <motion.div
              layoutId="underline"
              className={classes.underline}
              transition={{ duration: 0.3 }}
            />
          )}
        </span>
      )}
    </NavLink>
  );
};

export default AnimatedNavLink;


/*
<NavLink
      to={to}
      className={`nav-link position-relative px-2 ${isActive ? "active" : ""}`}
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.div
              layoutId="underline"
              className={classes.underline}
              transition={{ duration: 0.3 }}
            />
          )}
        </>
      )}
    </NavLink>

    */