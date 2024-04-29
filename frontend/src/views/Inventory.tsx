import Header from "../components/header/Header";
import Main from "../components/inventory/Main";
import Navbar from "../components/left_nav/Navbar";

const Inventory = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <Main />
      </div>
    </>
  );
};

export default Inventory;
