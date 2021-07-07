import { useDispatch, useSelector } from "react-redux";
import { likePost } from "./postsSlice";
import { unlikePost } from "./postsSlice";

export const LikeButton = ({ post }) => {
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const isLiked = () => {
    return post.likes.includes(currentUserId);
  };

  const likePostByUser = async () => {
    try {
      await dispatch(likePost({ postId: post._id, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const unlikePostUser = async () => {
    try {
      await dispatch(unlikePost({ postId: post._id, token }));
    } catch (error) {}
  };

  return (
    <div className="flex-horizontal margin-top">
      <button
        className="icon-btn"
        onClick={() => {
          isLiked() ? unlikePostUser() : likePostByUser();
        }}
      >
        <span
          className={
            isLiked()
              ? "material-icons-outlined icon-color-primary icon-size-24"
              : "material-icons-outlined icon-color-gray icon-size-24"
          }
        >
          favorite
        </span>
      </button>
      <span>{post.likes.length} likes</span>
    </div>
  );
};
