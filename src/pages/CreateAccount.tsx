import classes from "./CreateAccount.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { redirect, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";

const CreateAccount: React.FC = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailValue,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().includes("@") === true
  );

  const [password, setPassword] = useState<string>("");
  const [isFormValid, setFormIsValid] = useState(false);

  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const navigate = useNavigate();
  function navigateToLoginHandler() {
    navigate("/login");
  }

  useEffect(() => {
    if (nameIsValid && emailIsValid && password.trim() !== "") {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameValue, emailValue, password]);

  const auth = getAuth(app);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormValid) {
      createUserWithEmailAndPassword(auth, emailValue, password)
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

  return (
    <div className={classes.container}>
      <form onSubmit={submitFormHandler}>
        <h1>Create Account</h1>
        <div>
          <label>Name</label>
          <input id="name" value={nameValue} onChange={nameChangeHandler} />
        </div>
        <div>
          <label>Email</label>
          <input id="email" value={emailValue} onChange={emailChangeHandler} />
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
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
