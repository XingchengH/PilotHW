import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../store/userActions.tsx";
import UserCard from "../components/users/UserCard";
import type { AppDispath, RootState } from "../store/store.tsx";
import { userActions } from "../store/userSlice.tsx";

const Users: React.FC = () => {
  const dispath = useDispatch<AppDispath>();
  const users = useSelector((state: RootState) => state.users);
  const [term, setTerm] = useState("");

  useEffect(() => {
    dispath(fetchUserData());
  }, [dispath]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTerm(value);
    dispath(userActions.searchUser(value));
  };

  const clickHandler = () => {
    dispath(userActions.sortUser());
  };

  return (
    <>
      <div className="row my-3">
        <form className="col d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control"
            id="searchUser"
            placeholder="Search by name or username"
            value={term}
            onChange={changeHandler}
          />
          <motion.button
            type="button"
            className="btn btn-outline-primary"
            style={{ whiteSpace: "nowrap", width: "150px" }}
            onClick={clickHandler}
            animate={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{type: 'spring', stiffness: 1000}}
          >
            {`${users.isUserSorted ? "Unsort User" : "Sort User"}`}
          </motion.button>
        </form>
      </div>

      <div className="row g-3 my-3">
        {users.users.map((user) => (
          <div className="col-8 offset-2 col-sm-8 offset-sm-2 offset-md-0 col-md-6 col-lg-3">
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              phone={user.phone}
              email={user.email}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
