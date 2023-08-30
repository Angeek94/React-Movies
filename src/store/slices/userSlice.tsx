import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

// Define the initial state using that type
const IInitialUserState: IUser = {
  username: "",
  email: "",
  password: "",
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: IInitialUserState,

  reducers: {
    setUser: (_, action: PayloadAction<IUser>) => {
      localStorage.setItem("data", JSON.stringify(action.payload));
      return action.payload;
    },
    changePassword: (state: IUser, action: PayloadAction<string>) => {
      localStorage.setItem(
        "data",
        JSON.stringify({ ...state, password: action.payload })
      );
      return { ...state, password: action.payload };
    },
    setIsLogged: (state: IUser, action: PayloadAction<boolean>) => {
      localStorage.setItem(
        "data",
        JSON.stringify({ ...state, isLogged: action.payload })
      );
      return { ...state, isLogged: action.payload };
    },
    deleteUser: () => {
      localStorage.removeItem("data");
      return { ...IInitialUserState };
    },
  },
});

export const { setUser, changePassword, setIsLogged, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
