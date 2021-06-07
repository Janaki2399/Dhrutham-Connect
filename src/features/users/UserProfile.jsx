import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./userSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userFollowed, userUnFollowed } from "../users/userSlice";

export const UserProfile = () => {
  const status = useSelector((state) => state.user.userProfileStatus);
  const profile = useSelector((state) => state.user.userProfile);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.auth.token);
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile(userName));
  }, [dispatch, userName]);

  const isUserInFollowingList = () => {
    return currentUser.following?.includes(profile._id);
  };
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
    <div>
      {status === "idle" && <div className="margin-top">LOADING...</div>}
      {status === "succeeded" && (
        <div>
          <img src={profile.photoUrl} alt="profile-pic"></img>
          <div className="margin-top">
            {profile.firstName} {profile.lastName}
          </div>
          {currentUser.userName !== userName && (
            <button
              onClick={() => {
                isUserInFollowingList()
                  ? unFollowUser(profile._id)
                  : followUser(profile._id);
              }}
            >
              {isUserInFollowingList() ? "Following" : "Follow"}
            </button>
          )}
          <div>{profile.userName}</div>
          <div onClick={() => navigate(`/users/${profile.userName}/followers`)}>
            Followers : {profile.followers?.length}
          </div>
          <div onClick={() => navigate(`/users/${profile.userName}/following`)}>
            Following : {profile.following?.length}
          </div>
        </div>
      )}
    </div>
  );
};
