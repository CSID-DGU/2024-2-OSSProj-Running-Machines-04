import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@pages/Home/HomePage";
import RecordPage from "@pages/Record/RecordPage";
import CrewPage from "@pages/Crew/CrewPage";
import CommunityPage from "@pages/Community/CommunityPage";
import MyPage from "@pages/Mypage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/record", element: <RecordPage /> },
      { path: "/crew", element: <CrewPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
