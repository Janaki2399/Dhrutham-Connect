import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { current, unwrapResult } from "@reduxjs/toolkit";

export const CreatePost = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const status = useSelector((state) => state.posts.addStatus);
  const error = useSelector((state) => state.posts.error);

  const createPost = async (e) => {
    try {
      e.preventDefault();
      const resultAction = await dispatch(addPost({ text, token }));
      unwrapResult(resultAction);
      setText("");
    } catch (error) {}
  };

  return (
    <section
      className=" create-post flex-horizontal gray-border margin-top "
      // style={{
      //   width: "90%",
      //   maxWidth: "35rem",
      //   margin: "auto",
      //   marginTop: "3rem",
      //   border: "1px gray solid",
      // }}
    >
      <div className="img-margin">
        <img
          className="round-img img-size-small"
          src={currentUser.photoUrl}
          alt="profile-pic"
        />
      </div>
      <div className="full-width ">
        <form onSubmit={createPost} className="flex-column">
          <textarea
            className="post-text-area"
            placeholder="Share your thoughts"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <div className="margin-top">
            <button
              className="btn btn-primary-contained post-btn"
              disabled={text.length === 0 || status === "loading"}
              type="submit"
            >
              POST
            </button>
          </div>
        </form>
      </div>

      <div>{status === "failed" && error}</div>
    </section>
  );
};
