import { createBrowserRouter } from "react-router-dom";
import Profile from "../views/Profile";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

export default router;
