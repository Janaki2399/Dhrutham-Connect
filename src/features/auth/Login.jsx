import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./authSlice";
import { useForms } from "./useForms";

export const Login = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const error = useSelector((state) => state.auth.error);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      localStorage?.setItem("login", JSON.stringify({ token }));
      navigate("/");
    }
  }, [loginStatus, token, navigate]);

  const login = () => {
    if (loginStatus === "idle" || loginStatus === "failed") {
      dispatch(userLogin(userDetails));
    }
  };

  const {
    touchedFields,
    handleOnChange,
    handleOnBlur,
    validateLogin,
    isBtnDisabled,
  } = useForms(setUserDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  const errors = validateLogin(userDetails.email, userDetails.password);

  const shouldShowErrors = (field) => {
    return errors[field] ? touchedFields[field] : false;
  };
  const getInputClassName = (field) => {
    return shouldShowErrors(field)
      ? "text-input error-border-color"
      : "text-input generic-border-color";
  };
  return (
    <div className="center-page-align auth-form-size">
      <form
        onSubmit={handleSubmit}
        className=" border-all gray-border padding-all"
      >
        <div className="font-size-3 margin-bottom text-center">Login</div>
        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Email</label>
          <input
            type="email"
            class={getInputClassName("email")}
            onChange={handleOnChange("email")}
            onBlur={() => handleOnBlur("email")}
          />
          {shouldShowErrors("email") && <InputError error={errors.email} />}
        </div>

        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Password</label>
          <input
            type="password"
            class={getInputClassName("password")}
            onChange={handleOnChange("password")}
            onBlur={() => handleOnBlur("password")}
          />
          {shouldShowErrors("password") && (
            <InputError error={errors.password} />
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isBtnDisabled(errors)}
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
      </form>
      {loginStatus === "loading" && (
        <div className="margin-top flex flex-col">
          <div className="loader margin-auto" />
        </div>
      )}
      {loginStatus === "failed" && (
        <div className="alert-error margin-top text-center padding-small">
          {error}
        </div>
      )}
    </div>
  );
};
export const InputError = ({ error }) => {
  return (
    <span role="alert" className="red-color font-size-6">
      {error}
    </span>
  );
};
