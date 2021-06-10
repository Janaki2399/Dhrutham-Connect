import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userFollowed, userUnFollowed } from "../users/userSlice";
import axios from "axios";
export const FollowerFollowingList = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  //   const profile = useSelector((state) => state.user.userProfile);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const isUserInFollowingList = (id) => {
    return currentUser.following?.includes(id);
  };
  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get(
          `https://dhrutham-connect-backend.janaki23.repl.co${location.pathname}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (status === 200) {
          setList(data.list);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [location.pathname, token]);
  const followUser = async (profileUserId) => {
    try {
      const { status } = await axios.post(
        "https://dhrutham-connect-backend.janaki23.repl.co/users/follow",
        {
          _id: profileUserId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch(
          userFollowed({ currentUserId: currentUser._id, profileUserId })
        );
      }
    } catch (error) {}
  };

  const unFollowUser = async (profileUserId) => {
    try {
      const { status } = await axios.post(
        "https://dhrutham-connect-backend.janaki23.repl.co/users/unfollow",
        {
          _id: profileUserId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch(
          userUnFollowed({ currentUserId: currentUser._id, profileUserId })
        );
      }
    } catch (error) {}
  };

  return (
    <div className="margin-top">
      {list.map((item) => {
        return (
          <div>
            {item.userName}
            {currentUser.userName !== item.userName && (
              <button
                onClick={() => {
                  isUserInFollowingList(item._id)
                    ? unFollowUser(item._id)
                    : followUser(item._id);
                }}
              >
                {isUserInFollowingList(item._id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
