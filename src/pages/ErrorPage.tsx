import classes from "./Root.module.css";

const ErrorPage: React.FC = () => {
  return (
    <>
      <main className={classes.content}>
        <h1>An error occured!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};

export default ErrorPage;
