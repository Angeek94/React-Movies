import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setIsLogged } from "../../../store/slices/userSlice";

export const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(setIsLogged(false));
    navigate("/");
  }, [dispatch, navigate]);
  return handleLogOut;
};
