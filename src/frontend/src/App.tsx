import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@components/common/ScrollToTop";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@components/common/Header";
import Navbar from "@components/common/Navbar";
import { useEffect } from "react";
import { getAccessToken } from "./utils/auth";

const queryClient = new QueryClient();

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const noHeaderPath = ["/record", "/community/write", "/crew/chat"];
  const noNavbarPath = ["/other-crew", "/signin", "/signup", "/crew/chat"];
  const authPath = ["/", "/signin", "/signup"];

  useEffect(() => {
    const accessToken = getAccessToken();
    // '/' 경로가 아니고, accessToken이 없을 때 '/signin'으로 이동
    if (!accessToken && !authPath.includes(pathname)) {
      alert("로그인이 필요합니다!");
      navigate("/signin", { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <div className="w-screen min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col shadow-lg">
        {!noHeaderPath.includes(pathname) && <Header />}
        <Outlet />
        {!noNavbarPath.includes(pathname) && <Navbar />}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
