import { useParams } from "react-router-dom";
import { useFetch } from "../useFetch";
import { motion } from "motion/react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();

  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<Post>(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null
  );

  const {
    data: comments,
    loading: commentLoading,
    error: commentError,
  } = useFetch<Comment[]>(
    postId
      ? `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      : null
  );

  if (postId === "undefined") {
    return (
      <p className="text-info text-center mt-4">Currently No Activity found</p>
    );
  }

  if (postLoading || commentLoading)
    return <p className="text-center mt-4">Loading post details...</p>;

  if (postError || !post)
    return <p className="text-danger text-center mt-4">{postError}</p>;

  return (
    <div className="container mt-4 cursor-pointer">
      <div className="card mb-4 border-success">
        <div className="card-header">
          <h4>{post.title}</h4>
        </div>
        <div className="card-body">
          <p>{post.body}</p>
        </div>
      </div>

      <h5 className="mb-3">Comments</h5>
      {comments && comments.length > 0 ? (
        <ul className="list-group mb-4 cursor-pointer">
          {comments.map((comment) => (
            <motion.li
              key={comment.id}
              className="list-group-item "
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(0, 123, 255, 0.7)",
                zIndex: 10,
              }}
            >
              <h6>
                {comment.name}{" "}
                <small className="text-muted">({comment.email})</small>
              </h6>
              <p className="mb-0">{comment.body}</p>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
}
