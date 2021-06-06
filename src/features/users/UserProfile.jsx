import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./userSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FollowersList } from "./FollowersList";
import { FollowingList } from "./FollowingList";

export const UserProfile = () => {
  const status = useSelector((state) => state.user.userProfileStatus);
  const profile = useSelector((state) => state.user.userProfile);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserProfile(userName));
  }, [dispatch, userName]);

  const isUserFollowed = () => {};

  return (
    <div>
      {status === "idle" && <div className="margin-top">LOADING...</div>}
      {status === "succeeded" && (
        <div>
          <img src={profile.photoUrl} alt="profile-pic"></img>
          <div className="margin-top">
            {profile.firstName} {profile.lastName}
          </div>
          {currentUser.userName !== userName && <button>Follow</button>}
          <div>{profile.userName}</div>
          <div onClick={() => navigate(`/${profile.userName}/followers`)}>
            Followers : {profile.followers?.length}
          </div>
          <div onClick={() => navigate(`/${profile.userName}/following`)}>
            Following : {profile.following?.length}
          </div>
        </div>
      )}
    </div>
  );
};
