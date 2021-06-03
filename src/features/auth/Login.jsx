import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./authSlice";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const status = useSelector((state) => state.auth.loginStatus);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (status === "succeeded") {
      // dispatch(fetchLoggedInUserDetails(token));
      navigate("/feed");
    }
  }, [status]);
  //   const [addResultStatus,setAddResultStatus]=useState("idle");
  const onlogin = () => {
    // setAddResultStatus("pending");
    if (status === "idle") {
      dispatch(userLogin({ email, password }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //   login(email, password, state);
        onlogin();
      }}
      className="center-align-ver-hor border-all gray-border padding-all"
      style={{ width: "90%", maxWidth: "20rem" }}
    >
      <div className="font-size-3 margin-bottom text-center">Login</div>
      <div class="flex-column">
        <label class="font-size-6 font-bold-1">Email</label>
        <input
          type="email"
          class="text-input "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="flex-column">
        <label class="font-size-6 font-bold-1">Password</label>
        <input
          type="password"
          class="text-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button className="btn btn-primary-contained full-width font-size-5">
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
    </form>
  );
};
