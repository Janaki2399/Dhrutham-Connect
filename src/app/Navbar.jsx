import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postsReset } from "../features/posts/postsSlice";
import { authReset } from "../features/auth/authSlice";
import { usersReset } from "../features/users/userSlice";
import { notificationsReset } from "../features/notifications/notificationsSlice";
import { SearchBar } from "../features/users/SearchBar";
export const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const loggedInUserData = useSelector((state) => state.user.currentUser);
  const loggedInUserStatus = useSelector(
    (state) => state.user.currentUserDataStatus
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      localStorage?.removeItem("login");
      navigate("/login");
    }
  }, [token, navigate]);
  const logout = () => {
    dispatch(postsReset());
    dispatch(usersReset());
    dispatch(notificationsReset());
    dispatch(authReset());
  };

  return (
    <div className="nav navbar-height ">
      <Link
        className="font-size-3 anchor-link text-color-primary cursor-pointer "
        to="/"
      >
        <div class="font-size-3 text-color-primary">Dhrutham Connect</div>
      </Link>
      <SearchBar />

      <div className="nav-list">
        {!token ? (
          <Link to="/login" className=" nav-item anchor-link margin-right">
            {" "}
            Login
          </Link>
        ) : (
          <div
            className="nav-item cursor-pointer margin-right"
            onClick={() => logout()}
          >
            Logout
          </div>
        )}
        {loggedInUserStatus === "succeeded" && (
          <div
            className="nav-item cursor-pointer margin-right"
            onClick={() => navigate(`/users/${loggedInUserData.userName}`)}
          >
            <img
              className="round-img img-size-xs"
              src={loggedInUserData.photoUrl}
              alt="profile-pic"
            />
            Hi {loggedInUserData.userName}
          </div>
        )}
        <div
          className="nav-item cursor-pointer margin-right"
          onClick={() => navigate(`/notification`)}
        >
          <span
            className={"material-icons-outlined icon-color-gray icon-size-28"}
          >
            notifications
          </span>
        </div>
      </div>
    </div>
  );
};
