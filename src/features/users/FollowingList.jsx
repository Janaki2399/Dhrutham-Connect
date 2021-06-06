import { useSelector } from "react-redux";
export const FollowingList = () => {
  const followingList = useSelector(
    (state) => state.user.userProfile.following
  );
  console.log({ followingList });
  return (
    <div className="margin-top">
      {followingList.map((item) => {
        return <div>{item.userName}</div>;
      })}
    </div>
  );
};
