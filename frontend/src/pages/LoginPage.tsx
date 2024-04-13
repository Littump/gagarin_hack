import Login from "@/modules/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/modules/Navbar";

function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);
  return <div>
    <Navbar title="Вход"/>
    <Login />
  </div>;
}

export default LoginPage;
