import { useEffect, useMemo } from "react";
import { SignUp } from "../../components/SignUp/SignUp";
import { Login } from "../../components/Login/Login";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();

  const renderMainSection = useMemo(() => {
    const user = localStorage.getItem("data");

    return user ? <Login /> : <SignUp />;
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("data");
    if (user) JSON.parse(user).isLogged && navigate("/dashboard");
  }, [navigate]);

  return renderMainSection;
};
