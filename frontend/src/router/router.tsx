import { Outlet, createBrowserRouter } from "react-router-dom";
import Profile from "../views/Profile";
import Home from "../views/Home";
import Inventory from "../views/Inventory";
import ItemPriceView from "../views/ItemPriceView";
import DefaultLayout from "../layout/DefaultLayout";
import InvestmentsView from "../views/InvestmentsView";
import CreatingProcess from "../components/Investments/CreatingProcess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/item-price",
        element: <ItemPriceView />,
      },
      {
        path: "/investments",
        element: <InvestmentsView />,
      },
      {
        path: "/investments/create",
        element: <CreatingProcess />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
