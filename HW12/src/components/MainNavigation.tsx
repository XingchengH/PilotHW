import { NavLink } from "react-router-dom";
import AnimatedNavLink from "./AnimatedNavLink";
import type React from "react";
import { toggleTheme } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const navLinks: { to: string; label: string }[] = [
  { to: "/", label: "Dashboard" },
  { to: "/posts", label: "Posts" },
  { to: "/users", label: "Users" },
  { to: "/todos", label: "Todos" },
];

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const isDark = theme === "dark";

  // scrolling when bg fade
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 transparent", "0 2px 10px rgba(0, 0, 0, 0.2)"]
  );

  return (
    <header>
      <motion.nav
        className={`navbar navbar-expand-sm fixed-top ${
          isDark ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } px-3`}
        style={{
          backgroundColor: isDark
            ? "rgba(33, 37, 41, 1)"
            : "rgba(255, 255, 255, 1)",
          opacity: backgroundOpacity,
          boxShadow: boxShadow,
          backdropFilter: "blur(10px)",
          transition: "background-color .3s ease",
        }}
      >
        <NavLink to="/" className="navbar-brand">
          Demo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <div className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <AnimatedNavLink key={link.to} to={link.to} label={link.label} />
            ))}
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center mx-2"
            style={{ width: "40px", height: "40px", overflow: "hidden" }}
            title="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

export default MainNavigation;
