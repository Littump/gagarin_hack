import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/modules/Sidebar";
import Navbar from "@/modules/Navbar";

interface Props {
  children: JSX.Element | string;
  title: string;
}

function MainLayout({ children, title }: Props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-gray-100 items-center ">
      <Navbar title={title} />
      <Sidebar />
      <div
        className={`pl-[6vw] w-full mx-auto flex flex-col items-center justify-center mt-24 mb-12`}
      >
        <div className="w-full h-full rounded-xl bg-white p-6">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
