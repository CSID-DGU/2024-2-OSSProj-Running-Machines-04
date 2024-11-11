import CommunityCard from "@/components/community/CommunityCard";

const CommunityList = () => {
  const cards = Array.from({ length: 8 });

  return (
    <div className="flex flex-col">
      {cards.map((_, index) => (
        <CommunityCard key={index} id={index} />
      ))}
    </div>
  );
};

export default CommunityList;
