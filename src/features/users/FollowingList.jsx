import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const FollowingList = () => {
  const location = useLocation();
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data, status } = axios.get("");
        if (status === 200) {
          setFollowingList(data.followingList);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <div className="margin-top">
      {followingList.map((item) => {
        return <div>{item.userName}</div>;
      })}
    </div>
  );
};
