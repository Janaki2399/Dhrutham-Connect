import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutButtonClicked } from "../features/auth/authSlice";
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
  const logout = async () => {
    await dispatch(logoutButtonClicked());
  };

  return (
    <div className="nav navbar-height">
      <Link
        className="font-size-3 anchor-link text-color-primary cursor-pointer "
        to="/"
      >
        Dhrutham Connect
      </Link>
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
        {/* {token && (
          <Link
            className=" nav-item anchor-link"
            to={`users/${loggedInUserData.userName}`}
          >
            {loggedInUserData.userName}
          </Link>
        )} */}
        <div
          className="nav-item cursor-pointer margin-right"
          onClick={() =>
            token
              ? navigate(`/users/${loggedInUserData.userName}`)
              : navigate("/")
          }
        >
          My profile
        </div>
      </div>
    </div>
  );
};
