import { useSelector } from "react-redux";
export const FollowingList = () => {
  const followingList = useSelector(
    (state) => state.user.userProfile.following
  );
  return (
    <div>
      {followingList.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
};
