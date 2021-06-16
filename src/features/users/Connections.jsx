import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userFollowed, userUnFollowed } from "./userSlice";
import axios from "axios";

export const Connections = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
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
        // setList((list) => list.filter((item) => item._id !== profileUserId));
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
        console.log(profileUserId);
        // setList((list) => list.filter((item) => item._id !== profileUserId));
        dispatch(
          userUnFollowed({ currentUserId: currentUser._id, profileUserId })
        );
      }
    } catch (error) {}
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "30rem",
        margin: "auto",
        marginTop: "3rem",
      }}
    >
      <div className="full-width">
        <button
          style={{ width: "50%" }}
          className="profile-btn"
          onClick={() => navigate(`/users/${currentUser.userName}/followers`)}
        >
          Followers
        </button>
        <button
          style={{ width: "50%" }}
          className="profile-btn"
          onClick={() => navigate(`/users/${currentUser.userName}/following`)}
        >
          Following
        </button>
      </div>

      <div className="margin-top ">
        {list.map((item) => {
          return (
            <div
              key={item._id}
              className="border-all gray-border cursor-pointer"
              onClick={() => {
                navigate(`/users/${item.userName}`);
              }}
            >
              <div className="flex-horizontal margint-top padding-all">
                <div>
                  <img
                    className="round-img img-size-small img-margin"
                    src={item.photoUrl}
                    alt="profile-pic"
                  />
                </div>
                <div className="flex-horizontal space-between full-width">
                  <div>
                    <div className="font-bold-1">
                      {item.firstName} {item.lastName}{" "}
                      <span className="text-gray">@{item.userName}</span>
                    </div>
                    <div className="font-size-5 ">{item.bio}</div>
                  </div>
                  <div>
                    {currentUser.userName !== item.userName && (
                      <button
                        className={
                          isUserInFollowingList(item._id)
                            ? "float-right profile-btn btn-primary-contained"
                            : "float-right profile-btn btn-primary-outline"
                        }
                        onClick={() => {
                          isUserInFollowingList(item._id)
                            ? unFollowUser(item._id)
                            : followUser(item._id);
                        }}
                      >
                        {isUserInFollowingList(item._id)
                          ? "Following"
                          : "Follow"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
