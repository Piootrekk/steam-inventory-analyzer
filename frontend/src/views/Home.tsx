import Header from "../components/header/Header";
import Main from "../components/inventory/Main";
import Navbar from "../components/left_nav/Navbar";
import NavbarContent from "../components/left_nav/NavbarContent";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Navbar children={<NavbarContent />} />
        <Main />
      </div>
    </>
  );
};

export default Home;
