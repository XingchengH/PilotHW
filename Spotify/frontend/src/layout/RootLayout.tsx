import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./RootLayout.css";
import LeftSidebar from "../components/LeftSidebar";

export default function RootLayout() {
  const CustomHandleE = ({ ...restProps }) => (
    <div className="custom-handle custom-handle-e" {...restProps} />
  );
  const CustomHandleW = ({ ...restProps }) => (
    <div className="custom-handle custom-handle-w" {...restProps} />
  );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="sticky-top bg-dark text-white">
        <MainNavigation />
      </header>

      <div className="flex-grow-1 d-flex" style={{ minHeight: 0 }}>
        <ResizableBox
          width={300}
          axis="x"
          minConstraints={[100, 0]}
          maxConstraints={[400, 0]}
          resizeHandles={["e"]}
          handle={<CustomHandleE />}
        >
          <LeftSidebar />
        </ResizableBox>

        <div className="flex-grow-1 overflow-auto p-3" style={{background: "#000"}}>
          <Outlet />
        </div>

        <ResizableBox
          width={200}
          axis="x"
          minConstraints={[150, 0]}
          maxConstraints={[400, 0]}
          resizeHandles={["w"]}
          handle={<CustomHandleW />}
        >
          <div
            className="h-100 bg-secondary text-white p-3"
            style={{ minHeight: "100%" }}
          >
            <h5>Right Sidebar</h5>
          </div>
        </ResizableBox>
      </div>
    </div>
  );
}
