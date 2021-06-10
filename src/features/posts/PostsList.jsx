import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostItem } from "./PostItem";
import { fetchPosts, selectPostIds } from "./postsSlice";

export const PostsList = () => {
  const status = useSelector((state) => state.posts.status);
  const token = useSelector((state) => state.auth.token);
  const postsListIds = useSelector(selectPostIds);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts(token));
    }
  }, [status, dispatch, token]);

  return (
    <div>
      {postsListIds.map((postId) => {
        return <PostItem key={postId} postId={postId} />;
      })}
    </div>
  );
};
