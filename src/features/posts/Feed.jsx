import { CreatePost } from "./CreatePost";
import { PostsList } from "./PostsList";
import { useEffect } from "react";

import { fetchFeed } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

export const Feed = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const feedStatus = useSelector((state) => state.posts.feedStatus);
  useEffect(() => {
    dispatch(fetchFeed(token));
  }, [token, dispatch]);

  if (feedStatus === "loading") {
    return <div className="loader center-page-align" />;
  }
  return (
    <>
      <CreatePost />
      {feedStatus === "succeeded" && <PostsList />}
    </>
  );
};
