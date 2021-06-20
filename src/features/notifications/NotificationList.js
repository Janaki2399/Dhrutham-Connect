import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeAgo } from "../posts/TimeAgo";
import {
  fetchNotifications,
  selectAllNotifications,
} from "./notificationsSlice";

export const NotificationList = () => {
  const token = useSelector((state) => state.auth.token);
  const notificationsStatus = useSelector(
    (state) => state.notifications.status
  );
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);

  useEffect(() => {
    dispatch(fetchNotifications(token));
  }, [dispatch, token]);

  if (notificationsStatus === "loading") {
    return <div className="loader center-page-align" />;
  }
  return (
    <div
      style={{
        width: "90%",
        maxWidth: "35rem",
        margin: "auto",
        marginTop: "3rem",
      }}
    >
      <div
        className="margin-bottom font-bold-1 font-size-4"
        style={{ margin: "auto", marginBottom: "3rem" }}
      >
        Notifications
      </div>
      <div>
        {notifications.map((notification) => {
          return (
            // <div>
            //   <div>
            //     <img src={notification.sender.photoUrl} alt="profile pic" />
            //   </div>
            //   <div>
            //     <span className="font-bold-1">
            //       {notification.sender.firstName} {notification.sender.lastName}
            //     </span>{" "}
            //     <span>
            //       {notification.action === "liked"
            //         ? "liked your tweet"
            //         : "followed you"}
            //     </span>
            //   </div>
            //   <div>
            //     {notification.postId && <div>{notification.postId.text}</div>}
            //   </div>
            // </div>
            <div class="center-div">
              <div
                class="stacked-list-group"
                // style={{ width: "23rem", maxWidth: "90%" }}
              >
                <div class="stacked-item">
                  {notification.action === "Liked" ? (
                    <span
                      className={
                        "material-icons-outlined icon-color-primary icon-size-36"
                      }
                    >
                      favorite
                    </span>
                  ) : (
                    <div class="img-margin">
                      <img
                        class="round-img img-size-small"
                        src={notification.sender.photoUrl} //change it
                        alt="profile-pic"
                      />
                    </div>
                  )}

                  <div class="font-size-5">
                    <div class="img-margin">
                      <img
                        class="round-img img-size-xs"
                        src={notification.sender.photoUrl}
                        alt="profile-pic"
                      />
                    </div>
                    <span class="font-bold-1">
                      {" "}
                      {notification.sender.firstName}{" "}
                      {notification.sender.lastName}
                    </span>{" "}
                    {notification.action === "Liked"
                      ? "liked your tweet"
                      : "started following you"}
                    <TimeAgo post={notification} />
                    {notification.action === "Liked" && (
                      <div className="border-all gray-border">
                        notification.postId.text
                      </div>
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
