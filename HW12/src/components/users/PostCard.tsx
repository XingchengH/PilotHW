import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const PostCard: React.FC<{
  title: string;
  body: string;
  postId: number;
  forward: boolean;
}> = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${props.postId}`);
  };

  return (
    <motion.div
      layout
      className="card"
      role="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header bg-success">{props.postId}</div>
      <ul className="list-group list-group-flush">
        <li role="listitem" className="list-group-item">
          {props.title}
        </li>
        <li role="listitem" className="list-group-item">
          {props.body}
        </li>
      </ul>
    </motion.div>
  );
};

export default PostCard;
