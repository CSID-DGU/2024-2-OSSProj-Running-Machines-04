import { Route } from "@/types/kakaoMap";
import { create } from "zustand";

// 카카오맵에 띄울 경로 정보 저장소
type state = {
  center: { lat: number; lng: number };
  errMsg: string;
  isLoading: boolean;
  routes: Route[]; // GPX 경로 데이터를 저장
};

type KakaomapStore = {
  kakaomapState: state;
  setKakaomapState: (newKakaomapState: state) => void;
};

const useKakaomapStore = create<KakaomapStore>()((set) => ({
  kakaomapState: {
    center: { lat: 37, lng: 127 },
    errMsg: "",
    isLoading: false,
    routes: [], // GPX 경로 데이터를 저장
  },
  setKakaomapState: (newKakaomapState) =>
    set(() => ({
      kakaomapState: newKakaomapState,
    })),
}));

export default useKakaomapStore;
