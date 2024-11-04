import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@components/common/ScrollToTop";
import { Outlet } from "react-router-dom";
import Header from "@components/common/Header";
import Navbar from "@components/common/Navbar";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div className="w-screen min-h-screen bg-white">
      <div className="w-full max-w-[430px] flex flex-col shadow-lg">
        <Header />
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
