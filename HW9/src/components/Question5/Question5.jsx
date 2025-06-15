import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../users/UserCard";

export default function SearchFilter() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    }

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.website.toLowerCase().includes(term)
    )
  })


  return (
    <>
      <div className="container my-3">
        <div className="row my-3">
          <div className="col col-md-12">
            <form>
              <label htmlFor="searchUser"></label>
              <input
                type="text"
                id="searchUser"
                className="form-control"
                placeholder="Search for a User"
                value={searchTerm}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <div className="row g-2">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
            />
          ))}
        </div>
      </div>
    </>
  );
}
