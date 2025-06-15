import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./users/UserCard";

export default function Users({ users, loading, err }) {
  const navigate = useNavigate();

  function onClick(e) {
    e.preventDefault();
    navigate("/form");
  }

  // Will Remove Later, showing loading Effect
  const [newLoading, setNewLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setNewLoading(false)
    }, 1000)
  }, [])
  

  let content = (
    <div className="row g-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          phone={user.phone}
          website={user.website}
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
        {newLoading ? (
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
