import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { deleteUser } from "../../../store/slices/userSlice";
import { message } from "antd";
//TODO handle before name methods
export const useDeleteUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeUser = useCallback(() => {
    dispatch(deleteUser());
    navigate("/");
  }, [dispatch, navigate]);

  const handleConfirmDeleteUser = useCallback(() => {
    removeUser();
    message.success("Account eliminato!");
  }, [removeUser]);

  return handleConfirmDeleteUser;
};
