import { useNavigate } from "react-router-dom";

const PostCard: React.FC<{ title: string; body: string; postId: number, forward: boolean }> = (
  props
) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${props.postId}`);
    }


  return (
    <div className="card" role="button" onClick={handleClick}>
      <div className="card-header">{props.postId}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.title}</li>
        <li className="list-group-item">{props.body}</li>
      </ul>
    </div>
  );
};

export default PostCard;
