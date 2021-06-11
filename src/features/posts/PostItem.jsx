import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import { LikeButton } from "./LikeButton";

export const PostItem = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  console.log({ post });
  const calculateTimeAgo = () => {
    const date = parseISO(post.createdAt);
    const timePeriod = formatDistanceToNowStrict(date);
    const timeWithShortUnit = timePeriod.replace(
      /\w+$/,
      (unit) =>
        ({
          minute: "m",
          minutes: "m",
          hour: "h",
          hours: "h",
          second: "s",
          seconds: "s",
          day: "d",
          days: "d",
          year: "y",
          years: "y",
          weeks: "w",
          week: "w",
        }[unit])
    );
    const timeWithoutSpace = timeWithShortUnit.replace(/\s+/g, "");
    return timeWithoutSpace;
  };

  return (
    <div
      className="card card-vertical card-content-padding"
      style={{ width: "60%" }}
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
            <span className="font-bold-1">{post.userId.firstName}</span>{" "}
          </div>
          <div className="font-size-6 text-gray">{post.userId.bio}</div>
          <div className="font-size-6 text-gray">{calculateTimeAgo()}</div>
        </div>
      </div>
      <div className="card-text">{post.text}</div>
      <LikeButton post={post} />
    </div>
  );
};
