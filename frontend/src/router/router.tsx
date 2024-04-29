import { createBrowserRouter } from "react-router-dom";
import Profile from "../views/Profile";
import Home from "../views/Home";
import Inventory from "../views/Inventory";
import ItemPriceNav from "../views/ItemPriceNav";

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
  {
    path: "/item-price",
    element: <ItemPriceNav />,
  },
  {
    path: "*",
    element: <div>NO PAGE FOUND</div>,
  },
]);

export default router;
