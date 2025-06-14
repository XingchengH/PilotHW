import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./users/UserCard";
import Form from "./users/Form";

export default function Users() {
  // URL: https://jsonplaceholder.typicode.com/users
  // disaly all user in route /users

  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      website: "",
    });


  const url = "https://jsonplaceholder.typicode.com/users";


  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(url);
        setUsers(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (e) {
        console.log(e);
        setErr("Faild to fetch users");
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name) {
      alert("Name is Required");
      return;
    }

    const newUser = {
      id: users.length + 1,
      ...formData,
    };

    setUsers([newUser, ...users]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    console.log(name);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

   
  let content = (
    <div className="row">
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
        {loading ? (
          loadingContent
        ) : err ? (
          <p className="text-danger text-center">{err}</p>
        ) : (
          content
        )}
      </div>

      <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </>
  );
}
