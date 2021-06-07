import { useSelector } from "react-redux";
import { FollowingList } from "./FollowingList";
import { useLocation } from "react-router-dom";
export const FollowersList = () => {
  const pathname = useLocation();

  const followersList = useSelector(
    (state) => state.user.userProfile.followers
  );

  return (
    <div className="margin-top">
      {followersList.map((item) => {
        return <div>{item.userName}</div>;
      })}
    </div>
  );
};
