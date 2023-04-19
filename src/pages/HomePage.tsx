import classes from "./HomePage.module.css";
import girl from "../Girl.svg";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  function startClickHandler() {
    navigate("/create-account");
  }

  return (
    <>
      <img src={girl} className={classes.image} />
      <div className={classes.container}>
        <h1>Welcome to Agenday</h1>
        <p>Your daily planner and goal achiever</p>
        <button onClick={startClickHandler}>Let's start</button>
      </div>
    </>
  );
};

export default HomePage;
