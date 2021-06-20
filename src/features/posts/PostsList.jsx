import { useSelector } from "react-redux";
import { PostItem } from "./PostItem";
import { selectPostIds } from "./postsSlice";

export const PostsList = () => {
  const feedStatus = useSelector((state) => state.posts.feedStatus);
  // const token = useSelector((state) => state.auth.token);
  const postsListIds = useSelector(selectPostIds);

  if (feedStatus === "loading") {
    return <div>Loading</div>;
  }
  return (
    <section
      className=""
      style={{
        width: "90%",
        maxWidth: "35rem",
        margin: "auto",
        marginTop: "3rem",
      }}
    >
      {postsListIds.map((postId) => {
        return <PostItem key={postId} postId={postId} />;
      })}
    </section>
  );
};
