import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUserData,
  fetchUserPostData,
  fetchComments,
} from "../store/userActions";
import type { AppDispath, RootState } from "../store/store";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Carousel } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserPostData());
    dispatch(fetchComments());
  }, [dispatch]);

  const users = useSelector((state: RootState) => state.users.users);
  const posts = useSelector((state: RootState) => state.users.posts);
  const comments = useSelector((state: RootState) => state.users.comments);

  const data = [
    { name: "Users", value: users.length },
    { name: "Posts", value: posts.length },
    { name: "Comments", value: comments.length },
  ];
  const COLORS = ["#d5cabd", "#4e8397", "#845ec2"];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard Overview</h2>

      <div className="row text-center mb-4 fw-semibold fs-5">
        <div className="col">
          <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
          Users: {users.length}
        </div>
        <div className="col">
          <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
          Posts: {posts.length}
        </div>
        <div className="col">
          <FontAwesomeIcon icon={faPaperclip} className="me-2 text-primary" />
          Comments: {comments.length}
        </div>
      </div>

      <Carousel indicators={false} interval={5000} pause="hover">
        {/* Pie Chart */}
        <Carousel.Item>
          <h5 className="text-center mb-3">Pie Chart</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-pie-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Carousel.Item>

        {/* Donut Chart */}
        <Carousel.Item>
          <h5 className="text-center mb-3">Donut Chart</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-donut-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Carousel.Item>

        {/* Bar Chart */}
        <Carousel.Item>
          <h5 className="text-center mb-3">Bar Chart</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4e8397" />
            </BarChart>
          </ResponsiveContainer>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Dashboard;
