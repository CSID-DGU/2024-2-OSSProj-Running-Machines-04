import MarathonCard from "@/components/community/MarathonCard";

const MarathonList = () => {
  const cards = Array.from({ length: 7 });

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex flex-wrap max-w-[330px] gap-5 justify-between items-center">
        {cards.map((_, index) => (
          <MarathonCard key={index} id={index} />
        ))}
      </div>
    </div>
  );
};

export default MarathonList;
