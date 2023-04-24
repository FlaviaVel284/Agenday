import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreateAccount from "./pages/CreateAccount";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import MonthlyGoals from "./pages/MonthlyGoals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create-account", element: <CreateAccount /> },
      { path: "login", element: <Login /> },
      { path: "monthly-goals", element: <MonthlyGoals /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
