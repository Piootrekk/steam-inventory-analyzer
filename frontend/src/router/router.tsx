import { createBrowserRouter } from "react-router-dom";
import Profile from "../views/Profile";
import Home from "../views/Home";
import Inventory from "../views/Inventory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "inventory",
    element: <Inventory />,
  },
]);

export default router;
