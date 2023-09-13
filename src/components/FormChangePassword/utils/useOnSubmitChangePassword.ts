import { useCallback } from "react";
import { IChangePassword } from "../../../interfaces/IChangePassword";
import { changePassword } from "../../../store/slices/userSlice";
import { useAppDispatch } from "../../../store/hooks";

export const useOnSubmitChangePassword = (handleOnOk: () => void) => {
  const dispatch = useAppDispatch();
  const handleOnSubmit = useCallback(
    ({ password }: Pick<IChangePassword, "password">) => {
      dispatch(changePassword(password));
      handleOnOk();
    },
    [dispatch, handleOnOk]
  );
  return handleOnSubmit;
};
