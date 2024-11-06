import MarathonCard from "./MarathonCard";

const MarathonList = () => {
  const cards = Array.from({ length: 7 });

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap max-w-[330px] gap-5 justify-between items-center">
        {cards.map((_, index) => (
          <MarathonCard key={index} id={index} />
        ))}
      </div>
    </div>
  );
};

export default MarathonList;
