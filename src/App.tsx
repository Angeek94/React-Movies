import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./store/slices/userSlice";
import { retrieveFavorites } from "./store/slices/favoritesSlice";

export function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("data");

    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(setUser(parsedUser));
    }

    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      dispatch(retrieveFavorites(JSON.parse(favorites)));
    }
  }, [dispatch]);

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Outlet />
    </>
  );
}

export default App;
