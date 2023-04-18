import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./Root.module.css";

const Root: React.FC = () => {
  return (
    <div className={classes.content}>
      <MainNavigation />
      <Outlet />
    </div>
  );
};

export default Root;
