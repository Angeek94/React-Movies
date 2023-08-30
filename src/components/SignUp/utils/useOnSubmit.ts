import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { useCallback } from "react";
import { setIsLogged, setUser } from "../../../store/slices/userSlice";
import { IUser } from "../../../interfaces/IUser";

export const useOnSubmit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmitLogin = useCallback(
    (user: IUser) => {
      dispatch(setIsLogged(true));
      dispatch(setUser(user));
      navigate("/dashboard");
    },
    [dispatch, navigate]
  );
  return handleSubmitLogin;
};
