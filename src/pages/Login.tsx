import classes from "./Login.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate, useNavigation } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  function navigateToRegisterHandler(): void {
    navigate("/create-account");
  }

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
