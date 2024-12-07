import { create } from "zustand";

// 코스 생성후 id 값 저장소
type UserCourseIdStore = {
  userCourseId: number;
  setUserCourseId: (newUserCourseId: number) => void;
};

const useUserCourseIdStore = create<UserCourseIdStore>()((set) => ({
  userCourseId: 0,
  setUserCourseId: (newUserCourseId) =>
    set(() => ({
      userCourseId: newUserCourseId,
    })),
}));

export default useUserCourseIdStore;
