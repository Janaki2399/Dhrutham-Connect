import { userSignUp } from "./authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const signUpStatus = useSelector((state) => state.auth.signUpStatus);
  useEffect(() => {
    if (signUpStatus === "succeeded") {
      localStorage?.setItem("login", JSON.stringify({ token }));
      navigate("/feed");
    }
  }, [signUpStatus, navigate, token]);

  // useEffect(() => {
  //   if (loggedInUserStatus === "succeeded") {
  //     navigate("/feed");
  //   }
  // }, [loggedInUserStatus]);

  const signUp = async () => {
    if (signUpStatus === "idle" || signUpStatus === "failed") {
      dispatch(userSignUp({ email, firstName, lastName, userName, password }));
    }
  };

  function handleSignUp(e) {
    e.preventDefault();
    // console.log("helo");
    const validationError = validateSignUp(
      firstName,
      lastName,
      userName,
      email,
      password
    );
    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }
    signUp({ firstName, lastName, userName, email, password });
  }

  function validateSignUp(firstName, lastName, userName, email, password) {
    let error = {};
    if (firstName.length === 0) {
      error.firstName = "First Name cannot be empty";
    }
    if (lastName.length === 0) {
      error.lastName = "First Name cannot be empty";
    }
    if (userName.length === 0) {
      error.lastName = "First Name cannot be empty";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="center-page-align border-all gray-border padding-all"
      style={{ width: "90%", maxWidth: "21rem" }}
      noValidate
    >
      <div className="font-size-3 margin-bottom text-center">Sign Up</div>
      <div class="flex-column margin-bottom">
        <label class="font-size-6 font-bold-1">First Name</label>
        <input
          type="text"
          className={
            errors.firstName
              ? "text-input error-border-color"
              : "text-input generic-border-color"
          }
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          // onBlur={()=>validateSignUp("firstName")}
        />
        {errors.firstName && (
          <span className="error-text font-size-6">{errors.firstName}</span>
        )}
      </div>

      <div class="flex-column margin-bottom">
        <label class="font-size-6 font-bold-1">Last Name</label>
        <input
          type="text"
          className={
            errors.lastName
              ? "text-input error-border-color"
              : "text-input generic-border-color"
          }
          // required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          // onBlur={()=>validateSignUp("lastName")}
        />
        {errors.lastName && (
          <span className="error-text font-size-6">{errors.lastName}</span>
        )}
      </div>
      <div class="flex-column margin-bottom">
        <label class="font-size-6 font-bold-1">UserName</label>
        <input
          type="text"
          className={
            errors.userName
              ? "text-input error-border-color"
              : "text-input generic-border-color"
          }
          // required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          // onBlur={()=>validateSignUp("lastName")}
        />
        {errors.userName && (
          <span className="error-text font-size-6">{errors.userName}</span>
        )}
      </div>
      <div class="flex-column margin-bottom">
        <label class="font-size-6 font-bold-1">Email</label>
        <input
          type="email"
          class="text-input "
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors.email && (
          <span className="error-text font-size-6">{errors.email}</span>
        )}
      </div>

      <div class="flex-column margin-bottom">
        <label class="font-size-6 font-bold-1">Password</label>
        <input
          type="password"
          className={
            errors.password
              ? "text-input error-border-color"
              : "text-input generic-border-color"
          }
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {errors.password && (
          <span className="error-text font-size-6">{errors.password}</span>
        )}
      </div>
      <div>
        <button
          className="btn btn-primary-contained full-width font-size-5"
          type="submit"
          // onClick={() => validateLogin(email, password, state)}
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
  );
};
