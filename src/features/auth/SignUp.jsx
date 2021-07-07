import { userSignUp } from "./authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForms } from "./useForms";
import { useDispatch, useSelector } from "react-redux";

export const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const signUpStatus = useSelector((state) => state.auth.signUpStatus);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (signUpStatus === "succeeded") {
      localStorage?.setItem("login", JSON.stringify({ token }));
      navigate("/");
    }
  }, [signUpStatus, navigate, token]);

  const signUp = async () => {
    if (signUpStatus === "idle" || signUpStatus === "failed") {
      dispatch(userSignUp(userDetails));
    }
  };

  const {
    touchedFields,
    handleOnChange,
    handleOnBlur,
    validateSignUp,
    isBtnDisabled,
  } = useForms(setUserDetails);

  function handleSignUp(e) {
    e.preventDefault();

    signUp();
  }
  const errors = validateSignUp(userDetails);

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
        onSubmit={handleSignUp}
        className=" border-all gray-border padding-all"
        noValidate
      >
        <div className="font-size-3 margin-bottom text-center">Sign Up</div>
        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">First Name</label>
          <input
            type="text"
            className={getInputClassName("firstName")}
            onChange={handleOnChange("firstName")}
            onBlur={() => handleOnBlur("firstName")}
          />
          {shouldShowErrors("firstName") && (
            <InputError error={errors.firstName} />
          )}
        </div>

        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Last Name</label>
          <input
            type="text"
            className={getInputClassName("lastName")}
            onChange={handleOnChange("lastName")}
            onBlur={() => handleOnBlur("lastName")}
          />
          {shouldShowErrors("lastName") && (
            <InputError error={errors.lastName} />
          )}
        </div>

        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Username</label>
          <input
            type="text"
            className={getInputClassName("userName")}
            onChange={handleOnChange("userName")}
            onBlur={() => handleOnBlur("userName")}
          />
          {shouldShowErrors("userName") && (
            <InputError error={errors.lastName} />
          )}
        </div>

        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Email</label>
          <input
            type="email"
            className={getInputClassName("email")}
            required
            onChange={handleOnChange("email")}
            onBlur={() => handleOnBlur("email")}
          />
          {shouldShowErrors("email") && <InputError error={errors.email} />}
        </div>

        <div class="flex-column margin-bottom">
          <label class="font-size-6 font-bold-1">Password</label>
          <input
            type="password"
            className={getInputClassName("password")}
            required
            onChange={handleOnChange("password")}
            onBlur={() => handleOnBlur("password")}
          />
          {shouldShowErrors("password") && (
            <InputError error={errors.password} />
          )}
        </div>

        <div>
          <button
            className="btn btn-primary-contained full-width font-size-5"
            type="submit"
            disabled={isBtnDisabled(errors)}
          >
            SIGN UP
          </button>
        </div>
        <div className="margin-top text-center font-size-6">
          Already have an account?
          <span
            className="text-color-primary font-bold-1 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
      {signUpStatus === "loading" && (
        <div className="margin-top flex flex-col">
          <div className="loader margin-auto" />
        </div>
      )}
      {signUpStatus === "failed" && (
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
