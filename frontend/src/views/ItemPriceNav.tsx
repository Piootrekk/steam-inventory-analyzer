import ItemPrice from "../components/ItemPrice";
import Header from "../components/header/Header";
import Navbar from "../components/left_nav/Navbar";

const ItemPriceNav = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <ItemPrice />
      </div>
    </>
  );
};

export default ItemPriceNav;
