import { useSelector } from "react-redux";
export const FollowersList = () => {
  const followersList = useSelector(
    (state) => state.user.userProfile.followers
  );
  return (
    <div>
      {followersList.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
};
