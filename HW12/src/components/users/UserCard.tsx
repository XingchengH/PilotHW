import type { User } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const UserCard: React.FC<User> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${props.id}`);
  };

  return (
    <motion.div
      layout
      className="card"
      role="button"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">{props.name}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Username: {props.username}</li>
        <li className="list-group-item">Email: {props.email}</li>
        <li className="list-group-item">Phone: {props.phone}</li>
      </ul>
    </motion.div>
  );
};

export default UserCard;
