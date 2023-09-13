import { useEffect, useMemo } from "react";
import { SignUp } from "../../components/SignUp/SignUp";
import { Login } from "../../components/Login/Login";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { useAppSelector } from "../../store/hooks";

export const AuthPage = () => {
  const user: IUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const renderMainSection = useMemo(() => {
    return Object.values(user).every((value) => !value) ? (
      <SignUp />
    ) : (
      <Login />
    );
  }, [user]);

  useEffect(() => {
    if (user.isLogged) navigate("/dashboard");
  }, [navigate, user]);

  return renderMainSection;
};
