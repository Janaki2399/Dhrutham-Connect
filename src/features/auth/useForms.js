import { useState } from "react";

export const useForms = (setUserDetails) => {
  const [touchedFields, setTouchedFields] = useState({});

  const handleOnChange = (field) => (e) => {
    setUserDetails((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handleOnBlur = (field) => {
    setTouchedFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  function validateSignUp({ firstName, lastName, userName, email, password }) {
    let error = {};
    if (firstName.length === 0) {
      error.firstName = "First Name cannot be empty";
    }
    if (lastName.length === 0) {
      error.lastName = "First Name cannot be empty";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  }

  const validateLogin = (email, password) => {
    let error = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  };

  const isBtnDisabled = (errors) => {
    if (Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };
  return {
    handleOnChange,
    handleOnBlur,
    validateSignUp,
    validateLogin,
    touchedFields,
    isBtnDisabled,
  };
};
