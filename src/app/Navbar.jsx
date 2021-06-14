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
        to="/feed"
      >
        Dhrutham Connect
      </Link>
      <SearchBar />
      {/* <div className="gray-color input-wrapper">
        <div>
          <input
            type="text"
            className="search-input font-size-4"
            placeholder="Search users"
            onKeyDown={handleSearch}
          />
        </div>

        <div className="icon-btn">
          <span
            className={"material-icons-outlined icon-color-gray icon-size-24"}
          >
            search
          </span>
        </div>
      </div> */}

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

        <div
          className="nav-item cursor-pointer margin-right"
          onClick={() => navigate(`/users/${loggedInUserData.userName}`)}
        >
          My profile
        </div>
        <div
          className="nav-item cursor-pointer margin-right"
          onClick={() => navigate(`/notification`)}
        >
          <span
            className={"material-icons-outlined icon-color-gray icon-size-24"}
          >
            notifications
          </span>
        </div>
      </div>
    </div>
  );
};
