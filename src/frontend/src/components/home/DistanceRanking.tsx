import CrewRankingCard from "./CrewRankingCard";

const DistanceRanking = () => {
  return (
    <div>
      <div>이번 주, 어떤 크루가 가장 많이 달렸을까요?</div>
      <div>
        <CrewRankingCard rank={1} />
        <CrewRankingCard rank={2} />
        <CrewRankingCard rank={3} />
      </div>
    </div>
  );
};

export default DistanceRanking;
