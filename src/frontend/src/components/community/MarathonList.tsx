import MarathonCard from "./MarathonCard";

const MarathonList = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap max-w-[330px] gap-5 justify-between items-center">
        <MarathonCard />
        <MarathonCard />
        <MarathonCard />
        <MarathonCard />
        <MarathonCard />
      </div>
    </div>
  );
};

export default MarathonList;
