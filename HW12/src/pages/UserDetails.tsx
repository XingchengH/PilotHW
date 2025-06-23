import { useParams } from "react-router-dom";
import { useFetch } from "../useFetch";
import { motion } from "motion/react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null
  );

  const {
    data: userPosts,
    loading: postLoading,
    error: postError,
  } = useFetch<Post[]>(
    userId
      ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      : null
  );

  if (userId === "undefined") {
    return <p className="text-info text-center mt-3"> No Activity Found</p>;
  }

  if (userLoading || postLoading)
    return <p className="text-center mt-4">Loading...</p>;
  if (userError || !user)
    return <p className="text-danger text-center mt-4">{userError}</p>;

  return (
    <div className="container mb-4">
      <h3 className="text-center my-4">User Profile</h3>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header text-white bg-success">
              <h5 className="mb-0">{user.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Username: {user.username}</li>
              <li className="list-group-item">Email: {user.email}</li>
              <li className="list-group-item">Phone: {user.phone}</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-center my-4">User Posts</h3>
      <div className="row g-3">
        {userPosts?.map((post) => (
          <div key={post.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <motion.div
              className="card h-100"
              whileHover={{
                scale: 1.05,
                border: "1px solid blue",
                boxShadow: "0 0 10px rgba(0, 123, 255, 0.7)",
              }}
            >
              <div className="card-body">
                <h6 className="card-title">{post.title}</h6>
                <p className="card-text text-truncate">{post.body}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
