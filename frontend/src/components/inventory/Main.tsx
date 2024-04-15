import Button from "../reusable/Button";
import Card from "../reusable/Card";

const Main = () => {
  const cards = Array.from({ length: 64 }, (_, i) => i);
  return (
    <>
      <div className="">
        <div className="flex flex-wrap flex-row gap-5 items-center px-10 py-10">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="w-24 h-24 text-white text-4xl hover:scale-110 transition-all hover:opacity-80 duration-300"
            >
              <h1>{card}</h1>
            </Card>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          console.log("xd");
        }}
      >
        <span className="">Fetch Inventory</span>
      </Button>
    </>
  );
};

export default Main;
