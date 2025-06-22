import { useNavigate, useLocation, useParams } from "react-router-dom";
import AnimateButton from "./Button";
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
      <AnimateButton
        isActive={isAll}
        onClick={() => navigate(`/${basePath}`)}
        className={isAll ? "border-primary shadow" : "border"}
      >
        All {basePath.charAt(0).toUpperCase() + basePath.slice(1)}
      </AnimateButton>

      <AnimateButton
        onClick={() => navigate(`/${basePath}/${id}`)}
        className={`btn px-4 py-2 ${
          isActivity ? "border-primary shadow" : "border"
        }`}
      >
        {labels.activity}
      </AnimateButton>
    </div>
  );
};

export default PageNavigation;
