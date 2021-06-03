import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  //   const logout = () => {
  //     setToken(null);
  //     // localStorage?.removeItem("login");
  //     navigate("/login");
  //   };

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
            // onClick={logout}
          >
            Logout
          </div>
        )}
        <Link className=" nav-item anchor-link" to="/library">
          My Profile
        </Link>
      </div>
    </div>
  );
};
