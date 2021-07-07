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
    <div className="list-align-center margin-top-5">
      <div
        className="margin-bottom font-bold-1 font-size-4 margin-auto"
        style={{ marginBottom: "3rem" }}
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
            <div className="center-div" key={notification._id}>
              <div className="stacked-list-group">
                <div className="stacked-item">
                  {notification.action === "Liked" ? (
                    <span
                      className={
                        "material-icons-outlined icon-color-primary icon-size-36"
                      }
                    >
                      favorite
                    </span>
                  ) : (
                    <div className="img-margin">
                      <img
                        className="round-img img-size-small"
                        src={notification.sender.photoUrl} //change it
                        alt="profile-pic"
                      />
                    </div>
                  )}

                  <div className="font-size-5">
                    <div className="img-margin">
                      <img
                        className="round-img img-size-xs"
                        src={notification.sender.photoUrl}
                        alt="profile-pic"
                      />
                    </div>
                    <span className="font-bold-1">
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
