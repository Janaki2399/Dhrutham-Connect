import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = ({ logout }) => {
  const loggedInUserData = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  return (
    <div className="sidebar border-all gray-border">
      <div>
        <div
          className="border-bottom gray-border padding-small"
          onClick={() => navigate(`/users/${loggedInUserData.userName}`)}
        >
          My profile
        </div>
        <div
          className="border-bottom gray-border padding-small"
          onClick={() => navigate(`/notification`)}
        >
          Notification
        </div>
        <div
          className="padding-small"
          onClick={() => {
            token ? logout() : navigate("/login");
          }}
        >
          {token ? "Logout" : "Login"}
        </div>
      </div>
    </div>
  );
};
