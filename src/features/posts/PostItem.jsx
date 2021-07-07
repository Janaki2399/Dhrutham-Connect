import { LikeButton } from "./LikeButton";
import { TimeAgo } from "./TimeAgo";
import { useNavigate } from "react-router";

export const PostItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="card card-vertical card-content-padding margin-top bg-white">
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
        </div>
      </div>
      <div className="card-text">{post.text}</div>
      {post.asset && post.asset.indexOf("video") > -1 && (
        <video controls>
          <source src={post.asset} type="video/mp4" />
          <source src={post.asset} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
      {post.asset && post.asset.indexOf("image") > -1 && (
        <img src={post.asset} alt="post" />
      )}
      <LikeButton post={post} />
    </div>
  );
};
