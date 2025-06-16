import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();
const UserContext = createContext();
const LanguageContext = createContext();

export { ProductContext, UserContext, LanguageContext };

/*
export default function UserContextProvider({children}) {
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

  const userCtx = {
    users: users,
    users2: users2,
    formData: formData,
    formData2: formData2,
    err: err,
    loading: loading,
    handleChange: handleChange,
    handleChange2: handleChange2,
    handleSubmit: handleSubmit,
    handleSubmit2: handleSubmit2
  }

  return <UserContext.Provider value={{userCtx}}>
    {children}
  </UserContext.Provider>
}

*/