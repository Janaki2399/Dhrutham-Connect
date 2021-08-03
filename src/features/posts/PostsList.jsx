import { useLocation } from "react-router-dom";
import { PostItem } from "./PostItem";

export const PostsList = ({ posts }) => {
  const location = useLocation();

  const sortedPosts = [...posts].sort((post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt)
  );

  return (
    <section className="list-align-center margin-top-3">
      {sortedPosts.map((post) => {
        return (
          <PostItem
            key={post._id}
            post={post}
            from={location.pathname === "/" ? "feed" : "profile"}
          />
        );
      })}
    </section>
  );
};
