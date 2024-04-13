import Card from "../reusable/Card/Card";

const Main = () => {
  const cards = Array.from({ length: 23 }, (_, i) => i);
  return (
    <div className="">
      <div className="flex flex-wrap flex-row gap-5 items-center px-10 py-10">
        {cards.map((card, index) => (
          <Card key={index} className="w-44 h-44 text-white text-4xl">
            <h1>{card}</h1>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Main;
