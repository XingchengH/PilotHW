import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import Users from "./components/Users";
import Form from "./components/users/Form";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table /> } />
        <Route path="/users" element={<Users />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
