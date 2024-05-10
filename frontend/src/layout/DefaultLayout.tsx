import { PropsWithChildren } from "react";
import Header from "../components/header/Header";
import Navbar from "../components/left_nav/Navbar";

type DefaultLayoutProps = PropsWithChildren;

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="order-1">
          <Navbar />
        </div>
        <div className="order-2 w-full overflow-y-auto max-h-screen pb-32">
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
