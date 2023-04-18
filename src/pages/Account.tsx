import classes from "./Account.module.css";
import google from "../google.svg";
import facebook from "../facebook.svg";
const Account: React.FC = () => {
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
    </div>
  );
};

export default Account;
