import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import PostCard from "../components/users/PostCard";
import { fetchUserPostData } from "../store/userActions";
import { userActions } from "../store/userSlice";
import AnimateButton from "../components/Button";

const Posts = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch<AppDispath>();
  const posts = useSelector((state: RootState) => state.users.posts);
  const users = useSelector((state: RootState) => state.users);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const idxOfLastPost = currentPage * postPerPage; // lastPost for current page
  const idxOfFirstPost = idxOfLastPost - postPerPage; // firstPost for current page
  const currentPosts = posts.slice(idxOfFirstPost, idxOfLastPost);

  const totalPages = Math.ceil(posts.length / postPerPage);

  useEffect(() => {
    dispatch(fetchUserPostData());
  }, [dispatch]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTerm(value);
    dispatch(userActions.searchPost(term));
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(userActions.sortPost());
  };

  return (
    <>
      <div className="row mt-3 mx-auto" style={{maxWidth: "500px"}}>
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
          <AnimateButton
            className="btn btn-outline-primary"
            style={{ whiteSpace: "nowrap", width: "150px" }}
            onClick={(e) => clickHandler(e)}
          >{`${
            users.isPostSorted ? "Unsort Post" : "Sort Post"
          }`}</AnimateButton>
        </form>
      </div>
      <div className="d-flex justify-content-center flex-wrap mt-4 gap-2">
        <AnimateButton
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </AnimateButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isEssential =
            page === currentPage || page === 1 || page === totalPages;

          return (
            <button
              key={page}
              className={`btn ${
                page === currentPage ? "btn-primary" : "btn-outline-primary"
              } ${!isEssential ? "d-none d-sm-inline" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
        <AnimateButton
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </AnimateButton>
      </div>
      <div className="row g-3 mb-3 mt-1">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="col-8 offset-2 col-md-6 offset-md-0 col-lg-8 offset-lg-2"
          >
            <PostCard
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
