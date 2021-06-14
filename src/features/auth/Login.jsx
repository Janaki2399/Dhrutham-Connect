import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "./authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      localStorage?.setItem("login", JSON.stringify({ token }));
      navigate("/feed");
    }
  }, [loginStatus, token, navigate]);

  const onlogin = () => {
    if (loginStatus === "idle" || loginStatus === "failed") {
      dispatch(userLogin({ email, password }));
    }
  };

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onlogin();
      }}
      className="center-page-align border-all gray-border padding-all"
      style={{ width: "90%", maxWidth: "20rem" }}
    >
      <div className="font-size-3 margin-bottom text-center">Login</div>
      <div class="flex-column">
        <label htmlFor="email" className="font-size-6 font-bold-1">
          Email
        </label>
        <input
          type="email"
          className="text-input "
          value={email}
          autoFocus={true}
          onChange={onEmailChanged}
        />
      </div>
      <div class="flex-column">
        <label htmlFor="password" className="font-size-6 font-bold-1">
          Password
        </label>
        <input
          type="password"
          className="text-input"
          value={password}
          onChange={onPasswordChanged}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary-contained full-width font-size-5"
        >
          LOGIN
        </button>
      </div>
      <div className="margin-top text-center font-size-6">
        Don't have an account?
        <span
          className="text-color-primary font-bold-1 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </div>

      {loginStatus === "failed" && <div>{error.message}</div>}
    </form>
  );
};
