import classes from "./HomePage.module.css";
import girl from "../Girl.svg";

const HomePage: React.FC = () => {
  return (
    <>
      <img src={girl} className={classes.image} />
      <div className={classes.container}>
        <h1>Welcome to Agenday</h1>
        <p>Your daily planner and goal achiever</p>
        <button>Let's start</button>
      </div>
    </>
  );
};

export default HomePage;
