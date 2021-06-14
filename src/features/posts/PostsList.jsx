import { useSelector } from "react-redux";
import { PostItem } from "./PostItem";
import { selectPostIds } from "./postsSlice";

export const PostsList = () => {
  const feedStatus = useSelector((state) => state.posts.feedStatus);
  console.log(feedStatus);
  // const token = useSelector((state) => state.auth.token);
  const postsListIds = useSelector(selectPostIds);
  // console.log(postsListIds);
  // console.log(postsListIds);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchFeed(token));
  // }, [token]);
  if (feedStatus === "loading") {
    return <div>Loading</div>;
  }
  return (
    <div>
      {postsListIds.map((postId) => {
        return <PostItem key={postId} postId={postId} />;
      })}
    </div>
  );
};
