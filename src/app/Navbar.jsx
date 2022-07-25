import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutButtonClicked } from "../features/auth/authSlice";
import { SearchBar } from "../features/users/SearchBar";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const loggedInUserData = useSelector((state) => state.user.currentUser);

  const loggedInUserStatus = useSelector(
    (state) => state.user.currentUserDataStatus
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeSideBar = () => {
    setSidebarOpen(false);
  };
  const logout = () => {
    localStorage?.removeItem("login");
    navigate("/login");
    dispatch(logoutButtonClicked());
  };

  return (
    <div className="nav navbar-height ">
      <Link
        className="font-size-3 anchor-link text-color-primary cursor-pointer "
        to="/"
      >
        <div className="font-size-3 text-color-primary desktop-logo margin-left">
          Dhrutham Connect
        </div>
        <div className=" align-center nav-item mobile-logo margin-left">
          <img src={logo} alt="logo" width="40" />
        </div>
      </Link>
      <SearchBar />

      <div className="nav-list desktop-menu margin-right">
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
            <span
              className={"material-icons-outlined icon-color-gray icon-size-28"}
            >
              logout
            </span>
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
      <div
        className="mobile-menu margin-right relative-position"
        onClick={() => setSidebarOpen((prevState) => !prevState)}
      >
        <span className="material-icons-outlined icon-size-36 cursor-pointer">
          menu
        </span>
      </div>
      {isSidebarOpen && <Sidebar logout={logout} closeSideBar={closeSideBar} />}
    </div>
  );
};
