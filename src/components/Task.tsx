import classes from "./Task.module.css";

const Task: React.FC<{ numberOfDays: number }> = (props) => {
  return (
    <div className={classes.day_task}>
      {[...Array(props.numberOfDays)].map((e, i) => (
        <input type="checkbox" className={classes.checkbox} />
      ))}
    </div>
  );
};

export default Task;
