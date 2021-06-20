import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./userSlice";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userFollowed, userUnFollowed } from "../users/userSlice";
import { fetchPostsOfUser } from "../posts/postsSlice";
import { PostsList } from "../posts/PostsList";
import { Modal } from "./modal";
import { API_URL } from "../../config";
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
        `${API_URL}/users/follow`,
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
        `${API_URL}/users/unfollow`,
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
  if (status === "loading") {
    return <div className="loader center-page-align" />;
  }
  const createdAt = profile.createdAt;
  const date = new Date(createdAt).toDateString();

  return (
    <div>
      {/* {status === "loading" && <div className="margin-top">LOADING...</div>} */}
      {status === "succeeded" && (
        <div style={{ width: "90%", maxWidth: "35rem", margin: "auto" }}>
          {modal && (
            <Modal setModal={setModal}>
              <EditUserProfile />
            </Modal>
          )}
          <div className="flex-horizontal ">
            <div className="img-margin margin-right margin-top img-size-large">
              <img
                className="round-img img-size-large responsive-img"
                src={profile.photoUrl}
                alt="profile-pic"
              ></img>
            </div>
            <div className="margin-top full-width">
              <div className="flex-horizontal space-between">
                <div className="flex-column">
                  <div className="font-size-3 font-bold-1">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div>{profile.userName}</div>
                </div>
                {currentUser.userName === userName && (
                  <button
                    className="profile-btn btn-primary-contained"
                    onClick={() => setModal(true)}
                  >
                    Edit Profile
                  </button>
                )}
                {currentUser.userName !== userName && (
                  <button
                    className="profile-btn btn-primary-contained "
                    onClick={() => {
                      isUserInFollowingList()
                        ? unFollowUser(profile._id)
                        : followUser(profile._id);
                    }}
                  >
                    {isUserInFollowingList() ? "Following" : "Follow"}
                  </button>
                )}
              </div>

              <div className="flex-horizontal margin-top">
                <div
                  className="margin-right cursor-pointer"
                  onClick={() =>
                    navigate(`/users/${profile.userName}/followers`)
                  }
                >
                  <span className="font-bold-1">
                    {profile.followers?.length}
                  </span>{" "}
                  Followers{" "}
                </div>
                <div
                  className="margin-right cursor-pointer"
                  onClick={() =>
                    navigate(`/users/${profile.userName}/following`)
                  }
                >
                  <span className="font-bold-1">
                    {profile.following?.length}
                  </span>{" "}
                  Following
                </div>
              </div>
              <div className="margin-top">{profile.bio}</div>
              {profile.location.length > 0 && (
                <div className="flex-horizontal margin-top">
                  <span className="material-icons-outlined icon-color-gray icon-size-24">
                    link
                  </span>
                  <a
                    href={profile.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profile.websiteLink}
                  </a>
                </div>
              )}
              <div className="flex-horizontal margin-top full-width">
                {profile.location.length > 0 && (
                  <div className="flex-horizontal margin-right">
                    <span className="material-icons-outlined icon-color-gray icon-size-24">
                      place
                    </span>
                    {profile.location}
                  </div>
                )}

                <div className="flex-horizontal margin-right">
                  <span className="material-icons-outlined icon-color-gray icon-size-24">
                    date_range
                  </span>
                  {date}
                </div>
              </div>
            </div>
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
