import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
export const CreatePost = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
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
    <section>
      <form onSubmit={createPost}>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <button
          disabled={text.length === 0 || status === "loading"}
          type="submit"
        >
          POST
        </button>
      </form>
      <div>{status === "failed" && error}</div>
    </section>
  );
};
