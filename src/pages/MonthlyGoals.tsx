import classes from "./MonthlyGoals.module.css";
import Task from "../components/Task";
import arrow_left from "../arrow-left.svg";
import arrow_right from "../arrow-right.svg";

let numberOfDays = 30;
const tasks = [
  "breakfast",
  "cleaning",
  "learning",
  "lunch",
  "workout",
  "dinner",
  "reading",
  "skincare",
  "2 l water",
  "socialize",
];

// const gridStyle = {
//   display: "grid",
//   "grid-template-row": `10vh repeat(${tasks.length} 3vh`,
//   gridTemplateColumns: `10vw repeat(${numberOfDays}, 10px);`,
// };

const MonthlyGoals: React.FC = () => {
  // const containerGrid = document.getElementById("containerGrid");
  // if (containerGrid) {
  //   containerGrid.style.gridTemplateColumns = `10vw repeat(${numberOfDays}, 10px);`;
  // }

  return (
    <div className={classes.container}>
      <div className={classes.months_nav}>
        {" "}
        <div className={classes.nav_button}>
          <img src={arrow_left} className={classes.arrows} />
          <p>March</p>
        </div>
        <div className={classes.nav_button}>
          <p>May</p>
          <img src={arrow_right} className={classes.arrows} />
        </div>
      </div>
      <div className={classes.goals_container}>
        {" "}
        <p className={classes.title}>April</p>
        <div className={classes.rule_horizontal} />
        <div className={classes.days}>
          {" "}
          {[...Array(numberOfDays + 1)].map((e, index) => (
            <p className={classes.day}>{index}</p>
          ))}
        </div>
        <div className={classes.rule_horizontal_2} />
        <div className={classes.tasks}>
          {" "}
          {tasks.map((task) => (
            <p className={classes.task}>{task}</p>
          ))}
        </div>
        <div className={classes.checkboxes}>
          {" "}
          {tasks.map((task) => (
            <Task numberOfDays={numberOfDays + 1}></Task>
          ))}
        </div>
        <div className={classes.rule_horizontal} />
        <div className={classes.rule_horizontal_2} />
        <p className={classes.title}>Achieved goals</p>
        <div className={classes.procents}>
          {" "}
          {[...Array(numberOfDays + 1)].map((e, index) => (
            <p className={classes.procent}>%</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyGoals;
