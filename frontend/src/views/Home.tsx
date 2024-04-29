import Header from "../components/header/Header";
import Navbar from "../components/left_nav/Navbar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Navbar />
      </div>
    </>
  );
};

export default Home;
