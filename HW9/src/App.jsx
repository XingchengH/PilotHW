import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import Users from "./components/Users";
import UsersWay2 from "./components/question2Way2/UsersWay2";
import Form from "./components/users/Form";
import FormWay2 from "./components/question2Way2/usersWay2/FormWay2";
import Header from "./components/Nav";
import Landing from "./components/Landing";
import Question3 from "./components/question3/Question3";
import Question4 from "./components/question4/Question4";
import SearchFilter from "./components/Question5/Question5";
// Question 2 Way 2 import
import { UserContext } from "./components/store/Context";

export default function App() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const [users2, setUsers2] = useState([]);
  const [formData2, setFormData2] = useState({
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
        setUsers2(res.data);

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

    setUsers((prev) => [...prev, newUser]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit2(e) {
    e.preventDefault();

    if (!formData2.name) {
      alert("Name is Required");
      return;
    }

    const newUser = {
      id: users2.length + 1,
      ...formData2,
    };

    setUsers2((prev) => [...prev, newUser]);

    setFormData2({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
  }

  function handleChange2(e) {
    const { name, value } = e.target;

    setFormData2((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route
          path="/users"
          element={
            <Users
              users={users}
              formData={formData}
              err={err}
              loading={loading}
            />
          }
        />

        <Route
          path="/usersway2"
          element={
            <UserContext.Provider
              value={{
                users2,
                err,
                loading,
                formData2,
                handleChange2,
                handleSubmit2,
              }}
            >
              <UsersWay2 />
            </UserContext.Provider>
          }
        />
        <Route
          path="/form2"
          element={
            <UserContext.Provider
              value={{
                users2,
                err,
                loading,
                formData2,
                handleChange2,
                handleSubmit2,
              }}
            >
              <FormWay2 />
            </UserContext.Provider>
          }
        />
        <Route
          path="/form"
          element={
            <Form
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/question3"
          element={
            <Question3 />
          }
        />
        <Route
          path="/question4"
          element={
            <Question4 />
          }
        />
        <Route
          path="/question5"
          element={
            <SearchFilter />
          }
        />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
