import { PostItem } from "./PostItem";

export const PostsList = ({ posts }) => {
  const sortedPosts = [...posts].sort((post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt)
  );

  return (
    <section className="list-align-center margin-top-3">
      {sortedPosts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </section>
  );
};
