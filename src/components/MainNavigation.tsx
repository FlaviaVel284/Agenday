import { Link } from "react-router-dom";
import homeIcon from "../home.svg";
import styles from "./MainNavigation.module.css";

const MainNavigation: React.FC = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.icon}>
        <Link to="">
          <img src={homeIcon} />{" "}
        </Link>
      </div>
      <div className={styles.buttons}>
        <Link to="/account" className={styles.button} relative="path">
          My Account
        </Link>
      </div>
    </div>
  );
};

export default MainNavigation;
