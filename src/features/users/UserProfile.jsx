import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./userSlice";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userFollowed, userUnFollowed } from "../users/userSlice";
import { fetchPostsOfUser } from "../posts/postsSlice";
import { PostsList } from "../posts/PostsList";
import { Modal } from "./modal";
import { EditUserProfile } from "./EditUserProfile";

export const UserProfile = () => {
  const status = useSelector((state) => state.user.userProfileStatus);
  const postStatus = useSelector((state) => state.posts.userProfilePostsStatus);
  const profile = useSelector((state) => state.user.userProfile);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ profile });
  useEffect(() => {
    dispatch(fetchUserProfile({ userName, token }));
  }, [dispatch, userName, token]);

  useEffect(() => {
    dispatch(fetchPostsOfUser({ userName, token }));
  }, [dispatch, userName, token]);

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
      {status === "loading" && <div className="margin-top">LOADING...</div>}
      {status === "succeeded" && (
        <div>
          {modal && (
            <Modal setModal={setModal}>
              <EditUserProfile />
            </Modal>
          )}
          <img src={profile.photoUrl} alt="profile-pic"></img>
          {currentUser.userName === userName && (
            <button
              className="btn btn-primary-outline"
              onClick={() => setModal(true)}
            >
              Edit Profile
            </button>
          )}
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
          <div>{profile.bio}</div>
          <div onClick={() => navigate(`/users/${profile.userName}/followers`)}>
            Followers : {profile.followers?.length}
          </div>
          <div onClick={() => navigate(`/users/${profile.userName}/following`)}>
            Following : {profile.following?.length}
          </div>
          <div>{profile.location}</div>
          <div>
            <a href={profile.websiteLink} target="_blank" rel="noreferrer">
              {profile.websiteLink}
            </a>
          </div>
        </div>
      )}
      {postStatus === "succeeded" && (
        <div>
          <PostsList />
        </div>
      )}
    </div>
  );
};
