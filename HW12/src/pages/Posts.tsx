import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import PostCard from "../components/users/PostCard";
import { fetchUserPostData } from "../store/userActions";
import { userActions } from "../store/userSlice";

const Posts = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch<AppDispath>();
  const posts = useSelector((state: RootState) => state.users.posts);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUserPostData());
  }, [dispatch]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTerm(value);
    dispatch(userActions.searchPost(term));
  };

  const clickHandler = () => {
    dispatch(userActions.sortPost());
  };

  return (
    <>
      <div className="row mt-3">
        <form className="col d-flex gap-2 align-items-center">
          <label htmlFor="searchPost"></label>
          <input
            type="text"
            className="form-control"
            id="searchPost"
            value={term}
            placeholder="Search post by title"
            onChange={changeHandler}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ whiteSpace: "nowrap" }}
            onClick={clickHandler}
          >{`${users.isPostSorted ? "Unsort Post" : "Sort Post"}`}</button>
        </form>
      </div>
      <div className="row g-3 my-3">
        {posts.map((post) => (
          <div className="col-8 offset-2 col-md-6 offset-md-0 col-lg-8 offset-lg-2">
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              forward={true}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
