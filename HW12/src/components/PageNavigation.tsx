import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion } from "motion/react";
import type React from "react";

interface PageNavigationProps {
  basePath: string; 
  paramKey: string;
  labels?: {
    all?: string;
    activity?: string;
  };
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  basePath,
  paramKey,
  labels = { all: "All", activity: "Activity" },
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const id = params[paramKey];
  const isAll = location.pathname === `/${basePath}`;
  const isActivity = location.pathname === `/${basePath}/${id}`;

  return (
    <div className="d-flex justify-content-center gap-3 border-bottom pb-4 mt-3">
      <motion.button
        type="button"
        onClick={() => navigate(`/${basePath}`)}
        className={`btn py-2 px-4 ${isAll ? "border-primary shadow" : "border"}`}
        animate={{ scale: isAll ? 1.05 : 1 }}
        whileTap={{ scale: 0.95, y: 2 }}
        transition={{ type: "spring", stiffness: 1000 }}
      >
        {labels.all} {basePath.charAt(0).toUpperCase() + basePath.slice(1)}
      </motion.button>

      <motion.button
        type="button"
        onClick={() => navigate(`/${basePath}/${id}`)}
        className={`btn px-4 py-2 ${isActivity ? "border-primary shadow" : "border"}`}
        animate={{ scale: isActivity ? 1.05 : 1 }}
        whileTap={{ scale: 0.95, y: 2 }}
        transition={{ type: "spring", stiffness: 1000 }}
      >
        {labels.activity}
      </motion.button>
    </div>
  );
};

export default PageNavigation;
