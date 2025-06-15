import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./usersWay2/UserCardWay2";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from "../context/Context";
export default function UsersWay2() {
  const {users2, loading, err} = useContext(UserContext);  
  
  const navigate = useNavigate();

  function onClick(e) {
    e.preventDefault;
    navigate("/form2");
  }


  let content = (
    <div className="row">
      {users2.map((user) => (
        <UserCard
          key={user.id}
          name2={user.name}
          email2={user.email}
          phone2={user.phone}
          website2={user.website}
        />
      ))}
    </div>
  );

  let loadingContent = (
    <div className="row">
      {Array.from({ length: 4 }).map((_, index) => (
        <UserCard key={index} loading />
      ))}
    </div>
  );

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mb-4">Users List</h1>
        {loading ? (
          loadingContent
        ) : err ? (
          <p className="text-danger text-center">{err}</p>
        ) : (
          content
        )}
        <div className="row my-4">
        <div className="col-md-4 offset-md-4">
          <button className="btn btn-primary w-100" onClick={onClick}>
            Add More User
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
