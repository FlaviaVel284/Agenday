import classes from "./Login.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useInput from "../hooks/useInput";

const Login: React.FC = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().includes("@") === true
  );

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
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

  const auth = getAuth();

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

  const emailInputClasses = emailInputHasError ? classes.invalid : "";

  const passwordInputClasses = passwordInputHasError ? classes.invalid : "";

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <h1>Login</h1>
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
          <img src={facebook} alt="facebook" id="facebook" />
          <img src={google} alt="google" id="google" />
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
