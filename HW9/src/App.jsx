import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import Users from "./components/Users";
import Form from "./components/users/Form";
import Header from "./components/Header";
import Landing from "./components/Landing";

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

  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(url);
        setUsers(res.data)

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
  
      setUsers(prev => (
        [...prev, newUser]
      ))      
  
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


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}/> 
        <Route path="/table" element={<Table /> } />
        <Route path="/users" element={<Users users={users} formData={formData} err={err} loading={loading}/>}/>
        <Route path="/form" element={<Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}/>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
