import classes from "./Login.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  function navigateToRegisterHandler(): void {
    navigate("/create-account");
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <div className={classes.container}>
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" />
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
