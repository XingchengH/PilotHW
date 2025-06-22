import { userActions } from "./userSlice";

import axios from "axios";

const fetchUserData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        return res.data;
      } catch (e) {
        throw new Error(`Could not fetch user data: ${e}`);
      }
    };

    try {
      const userData = await fetchData();
      dispatch(userActions.updateUser(userData));
    } catch (error) {
      console.log("Failed to fetch user data: ", error);
    }
  };
};

const fetchUserPostData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        return res.data;
      } catch (e) {
        throw new Error(`Could not fetch user data: ${e}`);
      }
    };

    try {
      const userPostData = await fetchData();      
      dispatch(userActions.updateUserPost(userPostData));
    } catch (error) {
      console.log("Failed to fetch user data: ", error);
    }
  };
};

const fetchUsersTodos = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );

        return res.data;
      } catch (e) {
        throw new Error(`Could not fetch user data: ${e}`);
      }
    };

    try {
      const usersTodos = await fetchData();            
      dispatch(userActions.updateTodos(usersTodos));
    } catch (error) {
      console.log("Failed to fetch user data: ", error);
    }
  };
};

const fetchComments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
      dispatch(userActions.updateComments(response.data));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };
};



export {fetchUserData, fetchUserPostData, fetchUsersTodos, fetchComments};
