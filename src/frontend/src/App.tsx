import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@components/common/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/common/Header";
import Navbar from "@components/common/Navbar";

const queryClient = new QueryClient();

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-screen min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col shadow-lg">
        {pathname !== "/" && <Header />}
        <Outlet />
        <Navbar />
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
