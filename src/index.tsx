import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { DetailsMoviePage } from "./pages/detailsMovie/DetailsMoviePage";
import { FavoritesPage } from "./pages/favorites/FavoritesPage";
import { SearchPage } from "./pages/search/SearchPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "details/:movieID",
        element: <DetailsMoviePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

root.render(
  <>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
