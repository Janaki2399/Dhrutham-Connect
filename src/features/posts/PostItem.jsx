import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import { LikeButton } from "./LikeButton";
import { TimeAgo } from "./TimeAgo";
import { Navigate, useNavigate } from "react-router";
export const PostItem = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const navigate = useNavigate();

  return (
    <div
      className="card card-vertical card-content-padding margin-top"
      // style={{ width: "60%" }}
    >
      <div className="card-header">
        <div className="img-margin">
          <img
            className="round-img img-size-small"
            src={post.userId.photoUrl}
            alt="profile-pic"
          />
        </div>
        <div className="card-text">
          <div>
            <span
              className="font-bold-1 cursor-pointer user-link"
              onClick={() => navigate(`/users/${post.userId.userName}`)}
            >
              {post.userId.firstName} {post.userId.lastName}
            </span>
          </div>
          <div className="font-size-6 text-gray">{post.userId.bio}</div>
          <TimeAgo post={post} />
          {/* <div className="font-size-6 text-gray">{calculateTimeAgo()}</div> */}
        </div>
      </div>
      <div className="card-text">{post.text}</div>
      <LikeButton post={post} />
    </div>
  );
};
