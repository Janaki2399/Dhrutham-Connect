import { LikeButton } from "./LikeButton";
import { TimeAgo } from "./TimeAgo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export const PostItem = ({ post, from }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const profile = useSelector((state) => state.user.userProfile);
  const { userName } = useParams();

  return (
    <div className="card card-vertical card-content-padding margin-top bg-white">
      <div className="card-header">
        <div className="img-margin">
          <img
            className="round-img img-size-small"
            src={
              from === "feed"
                ? currentUser.userName === post.userId.userName
                  ? currentUser.photoUrl
                  : post.userId.photoUrl
                : profile.photoUrl
            }
            alt="profile-pic"
          />
        </div>
        <div className="card-text">
          <div>
            <span
              className="font-bold-1 cursor-pointer user-link"
              onClick={() => navigate(`/users/${post.userId.userName}`)}
            >
              {from === "feed"
                ? currentUser.userName === post.userId.userName
                  ? currentUser.firstName
                  : post.userId.firstName
                : profile.firstName}{" "}
              {from === "feed"
                ? currentUser.userName === post.userId.userName
                  ? currentUser.lastName
                  : post.userId.lastName
                : profile.lastName}
            </span>
          </div>
          <div className="font-size-6 text-gray">
            {from === "feed"
              ? currentUser.userName === post.userId.userName
                ? currentUser.bio
                : post.userId.bio
              : profile.bio}
          </div>
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
