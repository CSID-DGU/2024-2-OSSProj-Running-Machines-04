import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@pages/Home/HomePage";
import RecordPage from "@pages/Record/RecordPage";
import MyCrewPage from "@/pages/MyCrew/MyCrewPage";
import MyPage from "@pages/Mypage/MyPage";
import CommunityPage from "@/pages/Community/CommunityPage";
import CommunityDetailPage from "@/pages/CommunityDetail/CommunityDetailPage";
import CommunityWritePage from "@/pages/CommunityWrite/CommunityWritePage";
import NoticeDetailPage from "@/pages/NoticeDetail/NoticeDetailPage";
import GalleryDetailPage from "@/pages/GalleryDetail/GalleryDetailPage";
import CrewMembersPage from "@/pages/CrewMembers/CrewMembersPage";
import CrewMemberDetailPage from "@/pages/CrewMemberDetail/CrewMemberDetailPage";
import OtherCrewPage from "@/pages/OtherCrew/OtherCrewPage";
import SigninPage from "@/pages/Signin/SigninPage";
import SignupPage from "@/pages/Signup/SIgnupPage";
import RunningPage from "@/pages/Running/RunningPage";
import ReviewPage from "@/pages/Review/ReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },

      { path: "/record", element: <RecordPage /> },
      { path: "/record/:id/running", element: <RunningPage /> },
      { path: "/record/:id/review/:courseId", element: <ReviewPage /> },

      { path: "/community", element: <CommunityPage /> },
      { path: "/community/:id", element: <CommunityDetailPage /> },
      { path: "/community/write", element: <CommunityWritePage /> },

      { path: "/crew", element: <MyCrewPage /> },
      { path: "/crew/notice/:id", element: <NoticeDetailPage /> },
      { path: "/crew/gallery/:id", element: <GalleryDetailPage /> },
      { path: "/crew/members", element: <CrewMembersPage /> },
      { path: "/crew/members/:id", element: <CrewMemberDetailPage /> },

      { path: "/other-crew", element: <OtherCrewPage /> },

      { path: "/mypage", element: <MyPage /> },

      { path: "/signin", element: <SigninPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

export default router;
