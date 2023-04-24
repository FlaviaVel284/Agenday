import classes from "./Login.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import useInput from "../hooks/useInput";
import { auth, providerFacebook, providerGoogle } from "../Firebase";
import { setActiveUser } from "../store/authSlice";

const Login: React.FC = () => {
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

  function navigateToRegisterHandler(): void {
    navigate("/create-account");
  }

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailValue, passwordValue]);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormValid) {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
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
        const errorMessage = error.message;
        console.log(errorMessage);
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

  const emailInputClasses = emailInputHasError ? classes.invalid : "";

  const passwordInputClasses = passwordInputHasError ? classes.invalid : "";

  return (
    <div className={classes.container}>
      {" "}
      <h1>Login</h1>
      <form onSubmit={submitFormHandler}>
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
          />
        </div>
        <div>
          <label>Password</label>
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
        <div className={classes.icons}>
          <img
            src={facebook}
            alt="facebook"
            id="facebook"
            onClick={popUpFacebook}
          />
          <img src={google} alt="google" id="google" onClick={popUpGoogle} />
        </div>
        <button className={classes.button}>LOGIN</button>
      </form>
      <p onClick={navigateToRegisterHandler}>
        Don't have an account? Click here to{" "}
        <b className={classes.register}>Register Now</b>
      </p>
    </div>
  );
};

export default Login;
function dispatch(arg0: { payload: any; type: "auth/setActiveUser" }) {
  throw new Error("Function not implemented.");
}
