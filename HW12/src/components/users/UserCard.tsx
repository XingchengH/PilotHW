import type { User } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserCard: React.FC<User> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${props.id}`);
  };

  return (
    <div className="card" role="button" onClick={handleClick}>
      <div className="card-header">{props.name}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Username: {props.username}</li>
        <li className="list-group-item">Email: {props.email}</li>
        <li className="list-group-item">Phone: {props.phone}</li>
      </ul>
    </div>
  );
};

export default UserCard;
