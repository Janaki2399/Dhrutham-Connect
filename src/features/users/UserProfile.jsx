import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./userSlice";
import { userProfileReset } from "./userSlice";
import { userPostsReset } from "../posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, unFollowUser } from "./userSlice";
import { fetchPostsOfUser } from "../posts/postsSlice";
import { PostsList } from "../posts/PostsList";
// import { Modal } from "./Modal";
// import { EditUserProfile } from "./EditUserProfile";

export const UserProfile = () => {
  const status = useSelector((state) => state.user.userProfileStatus);
  const postStatus = useSelector((state) => state.posts.userProfilePostsStatus);
  const userPosts = useSelector((state) => state.posts.userPosts);
  const profile = useSelector((state) => state.user.userProfile);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile({ userName, token }));
    return () => {
      dispatch(userProfileReset());
    };
  }, [dispatch, userName, token]);

  useEffect(() => {
    dispatch(fetchPostsOfUser({ userName, token }));
    return () => {
      dispatch(userPostsReset());
    };
  }, [dispatch, userName, token]);

  const isUserInFollowingList = () => {
    return currentUser.following?.includes(profile._id);
  };

  const handleConnectionAction = () => {
    isUserInFollowingList()
      ? dispatch(
          unFollowUser({
            profileUserId: profile._id,
            currentUserId: currentUser._id,
            token,
          })
        )
      : dispatch(
          followUser({
            profileUserId: profile._id,
            currentUserId: currentUser._id,
            token,
          })
        );
  };

  if (status === "loading") {
    return <div className="loader center-page-align" />;
  }
  const createdAt = profile.createdAt;
  const date = new Date(createdAt).toDateString();

  return (
    <div>
      {
        <div className="list-align-center ">
          {/* {modal && (
            <Modal setModal={setModal}>
              <EditUserProfile />
            </Modal>
          )} */}
          <div className="flex-horizontal margin-top-3 profile-mobile-view">
            <div className="img-margin margin-right margin-top img-size-large">
              <img
                className="round-img img-size-large"
                src={profile.photoUrl}
                alt="profile-pic"
              ></img>
            </div>
            <div className="margin-top full-width">
              <div className=" space-between flex-horizontal">
                <div className="flex-column">
                  <div className="font-size-3 font-bold-1">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div>{profile.userName}</div>
                </div>
                <div>
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
                      onClick={handleConnectionAction}
                    >
                      {isUserInFollowingList() ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
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
              {profile.location?.length > 0 && (
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
                {profile.location?.length > 0 && (
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
      }
      {postStatus === "succeeded" && (
        <div>
          <PostsList posts={userPosts} />
        </div>
      )}
    </div>
  );
};
