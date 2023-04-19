import classes from "./CreateAccount.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";

const CreateAccount: React.FC = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    hasError: nameInputHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().includes("@") === true
  );

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
  } = useInput((value) => value.trim() !== "" && value.length > 6);

  const [isFormValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();
  function navigateToLoginHandler() {
    navigate("/login");
  }

  useEffect(() => {
    if (nameIsValid && emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  const auth = getAuth(app);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormValid) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }

  const nameInputClasses = nameInputHasError ? classes.invalid : "";

  const emailInputClasses = emailInputHasError ? classes.invalid : "";

  const passwordInputClasses = passwordInputHasError ? classes.invalid : "";

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <h1>Create Account</h1>
        <div>
          <label>Name</label>{" "}
          {nameInputHasError && (
            <p className={classes.error}>Name must not be empty</p>
          )}
          <input
            className={nameInputClasses}
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
          />{" "}
        </div>
        <div>
          <label>Email</label>{" "}
          {emailInputHasError && (
            <p className={classes.error}>Email format not correct</p>
          )}
          <input
            className={emailInputClasses}
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
          />{" "}
        </div>
        <div>
          <label>Password</label>{" "}
          {passwordInputHasError && (
            <p className={classes.error}>
              Password should be more than 6 characters!
            </p>
          )}
          <input
            className={passwordInputClasses}
            id="password"
            type="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
          />{" "}
        </div>{" "}
        <p>or you can just join with:</p>
        <div className={classes.icons}>
          <img src={facebook} alt="facebook" id="facebook" />
          <img src={google} alt="google" id="google" />
        </div>
        <button className={classes.button} type="submit">
          SIGN UP
        </button>
      </form>
      <p onClick={navigateToLoginHandler}>
        Already have an account? Click here to{" "}
        <b className={classes.login}>Login</b>
      </p>
    </div>
  );
};

export default CreateAccount;
