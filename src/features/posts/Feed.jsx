import { CreatePost } from "./CreatePost";
import { PostsList } from "./PostsList";
import { useEffect } from "react";

import { fetchFeed } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../constants";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);
  const token = useSelector((state) => state.auth.token);
  const feedStatus = useSelector((state) => state.posts.feedStatus);

  useEffect(() => {
    if (feedStatus === API_STATUS.IDLE) {
      dispatch(fetchFeed(token));
    }
  }, [token, dispatch, feedStatus]);

  if (feedStatus === API_STATUS.LOADING) {
    return <div className="loader center-page-align" />;
  }

  return (
    <div className="margin-top-5 ">
      <CreatePost />
      <PostsList posts={feed} />
    </div>
  );
};
