import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { useCallback } from "react";
import { setIsLogged } from "../../../store/slices/userSlice";

export const useOnSubmit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmitLogin = useCallback(() => {
    dispatch(setIsLogged(true));
    navigate("/dashboard");
  }, [dispatch, navigate]);
  return handleSubmitLogin;
};
