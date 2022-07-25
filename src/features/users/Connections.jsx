import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConnections,
  followUser,
  unFollowUser,
  connectionsReset,
} from "./userSlice";

export const Connections = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const connectionsList = useSelector((state) => state.user.connections);
  const connectionsStatus = useSelector(
    (state) => state.user.connectionsStatus
  );

  const dispatch = useDispatch();

  const isUserInFollowingList = (id) => {
    return currentUser.following?.includes(id);
  };

  useEffect(() => {
    dispatch(fetchConnections({ pathname: location.pathname, token }));
    return () => {
      dispatch(connectionsReset());
    };
  }, [dispatch, token, location]);

  const handleConnectionAction = (userId) => {
    isUserInFollowingList(userId)
      ? dispatch(
          unFollowUser({
            profileUserId: userId,
            currentUserId: currentUser._id,
            token,
          })
        )
      : dispatch(
          followUser({
            profileUserId: userId,
            currentUserId: currentUser._id,
            token,
          })
        );
  };
  return (
    <div className="list-align-center margin-top-5">
      <div className="full-width">
        <button
          className="profile-btn half-width"
          onClick={() => navigate(`/users/${currentUser.userName}/followers`)}
        >
          Followers
        </button>
        <button
          className="profile-btn half-width"
          onClick={() => navigate(`/users/${currentUser.userName}/following`)}
        >
          Following
        </button>
      </div>
      {connectionsStatus === "loading" && (
        <div className="loader center-page-align" />
      )}
      {connectionsStatus === "succeeded" && (
        <div className="margin-top">
          {connectionsList.map((user) => {
            return (
              <div
                key={user._id}
                className="border-all gray-border cursor-pointer"
              >
                <div className="flex-horizontal margint-top padding-all">
                  <div>
                    <img
                      className="round-img img-size-small img-margin"
                      src={user.photoUrl}
                      alt="profile-pic"
                    />
                  </div>
                  <div className="flex-horizontal space-between full-width">
                    <div>
                      <div className="font-bold-1">
                        {user.firstName} {user.lastName}{" "}
                        <span className="text-gray">@{user.userName}</span>
                      </div>
                      <div className="font-size-5 ">{user.bio}</div>
                    </div>
                    <div>
                      {currentUser.userName !== user.userName && (
                        <button
                          className={
                            isUserInFollowingList(user._id)
                              ? "float-right profile-btn btn-primary-contained"
                              : "float-right profile-btn btn-primary-outline"
                          }
                          onClick={() => {
                            handleConnectionAction(user._id);
                          }}
                        >
                          {isUserInFollowingList(user._id)
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
      )}
    </div>
  );
};
