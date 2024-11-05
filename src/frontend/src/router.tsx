import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@pages/Home/HomePage";
import RecordPage from "@pages/Record/RecordPage";
import CrewPage from "@pages/Crew/CrewPage";
import MyPage from "@pages/Mypage/MyPage";
import FreeBoardPage from "@/pages/Community/FreeBoardPage";
import GroupRunBoardPage from "@/pages/Community/GroupRunBoardPage";
import RunningShoesBoardPage from "@/pages/Community/RunningShoesBoardPage";
import MarathonEventsBoardPage from "@/pages/Community/MarathonEventsBoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/record", element: <RecordPage /> },
      { path: "/crew", element: <CrewPage /> },
      { path: "/community/free", element: <FreeBoardPage /> },
      { path: "/community/run-together", element: <GroupRunBoardPage /> },
      {
        path: "/community/recommend-shoes",
        element: <RunningShoesBoardPage />,
      },
      {
        path: "/community/marathon-schedule",
        element: <MarathonEventsBoardPage />,
      },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
