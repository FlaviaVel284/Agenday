import classes from "./CreateAccount.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { useAppDispatch } from "../hooks/hooks";
import { setActiveUser } from "../store/authSlice";
import { auth, providerGoogle, providerFacebook } from "../Firebase";

const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    value: nameValue,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    hasError: nameInputHasError,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().includes("@") === true
  );

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
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

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormValid) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            setActiveUser({ userName: nameValue, userEmail: emailValue })
          );
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }

  function popUpGoogle(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault();
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        console.log(result);
        dispatch(
          setActiveUser({ userName: user.displayName, userEmail: user.email })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function popUpFacebook(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault();
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        console.log(result);
        dispatch(
          setActiveUser({ userName: user.displayName, userEmail: user.email })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }

  const nameInputClasses = nameInputHasError ? classes.invalid : "";

  const emailInputClasses = emailInputHasError ? classes.invalid : "";

  const passwordInputClasses = passwordInputHasError ? classes.invalid : "";

  return (
    <div className={classes.container}>
      {" "}
      <h1>Create Account</h1>
      <form onSubmit={submitFormHandler}>
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
            onBlur={nameBlurHandler}
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
            onBlur={emailBlurHandler}
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
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />{" "}
        </div>{" "}
        <p>or you can just join with:</p>
        <div className={classes.icons}>
          <img
            src={facebook}
            alt="facebook"
            id="facebook"
            onClick={popUpFacebook}
          />
          <img src={google} alt="google" id="google" onClick={popUpGoogle} />
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
