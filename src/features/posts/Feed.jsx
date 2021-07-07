import { CreatePost } from "./CreatePost";
import { PostsList } from "./PostsList";
import { useEffect } from "react";

import { fetchFeed } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);
  const token = useSelector((state) => state.auth.token);
  const feedStatus = useSelector((state) => state.posts.feedStatus);

  useEffect(() => {
    if (feedStatus === "idle") {
      dispatch(fetchFeed(token));
    }
  }, [token, dispatch, feedStatus]);

  return (
    <div className="margin-top-5 ">
      <CreatePost />
      {feedStatus === "loading" && <div className="loader center-page-align" />}
      {feedStatus === "succeeded" && <PostsList posts={feed} />}
    </div>
  );
};
