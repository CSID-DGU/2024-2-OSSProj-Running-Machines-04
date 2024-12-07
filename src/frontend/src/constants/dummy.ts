import { boardDetailResponse, boardResponse } from "@/types/board";
import { homeFaceRankingResponse, homeRankingResponse } from "@/types/home";

export const dummyCourseData = [
  {
    fileName: "21_Beginner_Essential_Facilities_NonTrack.gpx",
    waypoints: [
      {
        lat: 37.50186,
        lon: 127.070928,
      },
    ],
    distance: 2.598,
    tags: ["Beginner", "Essential", "Facilities", "NonTrack"],
    name: "탄천2교~올림픽대로",
  },
  {
    fileName: "37_Beginner_Essential_Facilities_NonTrack.gpx",
    waypoints: [
      {
        lat: 37.523308,
        lon: 127.11365,
      },
    ],
    distance: 2.253,
    tags: ["Beginner", "Essential", "Facilities", "NonTrack"],
    name: "성내천~한가람로",
  },
  {
    fileName: "46_Beginner_Essential_Facilities_NonTrack.gpx",
    waypoints: [
      {
        lat: 37.518916,
        lon: 127.116397,
      },
    ],
    distance: 1.896,
    tags: ["Beginner", "Essential", "Facilities", "NonTrack"],
    name: "평화의 광장~평화의 광장",
  },
  {
    fileName: "50_Beginner_Essential_Facilities_NonTrack.gpx",
    waypoints: [
      {
        lat: 37.518291,
        lon: 127.068264,
      },
    ],
    distance: 5.622,
    tags: ["Beginner", "Essential", "Facilities", "NonTrack"],
    name: "삼성교~탄천2교",
  },
  {
    fileName: "67_Beginner_Essential_Facilities_NonTrack.gpx",
    waypoints: [
      {
        lat: 37.494712,
        lon: 127.086935,
      },
    ],
    distance: 2.718,
    tags: ["Beginner", "Essential", "Facilities", "NonTrack"],
    name: "일원 에코파크~일원 에코파크",
  },
];

export const dummyDistanceCrew: homeRankingResponse[] = [
  {
    rank: 1,
    crewId: 1,
    crewName: "서울FRC 러닝크루",
    distance: 10239,
    profileImage:
      "https://mant.co.kr/web/product/big/202310/de18ee600beebc0a15a1d80ab9770638.jpg",
  },
  {
    rank: 2,
    crewId: 1,
    crewName: "BTRC 러닝크루",
    distance: 9396,
    profileImage:
      "https://cafe24.poxo.com/ec01/niacom0803/5GslpdAnCPzGTb8GqqEZ3j9W8PbV9xVKJx7NVKrE/h4NpwmrqazOb++iMiMzfrbktxXZcg8qpLZQEBtTNSaMDQ==/_/web/product/big/202209/a6d71f91c85a129921e32e09123b4076.jpg",
  },
  {
    rank: 3,
    crewId: 1,
    crewName: "running life",
    distance: 9130,
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgR1QYIyGljbx1rbgXMgA0vFc0KvsN4Q4oBQ&s",
  },
];

export const dummyFaceCrew: homeFaceRankingResponse[] = [
  {
    rank: 1,
    crewId: 1,
    crewName: "서울FRC 러닝크루",
    face: "6'55\"",
    profileImage:
      "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2019%2F03%2Frun-crew-88seoul-street-snaps-2.jpg?w=1260&cbr=1&q=90&fit=max",
  },
  {
    rank: 2,
    crewId: 1,
    crewName: "BTRC 러닝크루",
    face: "7'83\"",
    profileImage:
      "https://images.samsung.com/is/image/samsung/p5/sec/campaign/magazine/vol9/bg_kv_v2.jpg?$ORIGIN_JPG$",
  },
  {
    rank: 3,
    crewId: 1,
    crewName: "running life",
    face: "7'88\"",
    profileImage:
      "https://cafe24.poxo.com/ec01/niacom0803/5GslpdAnCPzGTb8GqqEZ3j9W8PbV9xVKJx7NVKrE/h4NpwmrqazOb++iMiMzfrbktxXZcg8qpLZQEBtTNSaMDQ==/_/web/product/big/202209/a6d71f91c85a129921e32e09123b4076.jpg",
  },
];
