import classes from "./CreateAccount.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
import { useNavigate } from "react-router-dom";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  function navigateToLoginHandler() {
    navigate("/login");
  }

  return (
    <div className={classes.container}>
      <form>
        <h1>Create Account</h1>
        <div>
          <label>Name</label>
          <input name="name" />
        </div>
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" />
        </div>{" "}
        <p>or you can just join with:</p>
        <div className={classes.icons}>
          <img src={facebook} alt="facebook" id="facebook" />
          <img src={google} alt="google" id="google" />
        </div>
        <button className={classes.button}>SIGN UP</button>
      </form>
      <p onClick={navigateToLoginHandler}>
        Already have an account? Click here to{" "}
        <b className={classes.login}>Login</b>
      </p>
    </div>
  );
};

export default CreateAccount;
