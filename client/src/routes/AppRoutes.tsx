import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
import HomePage from "../pages/HomePage";
import WorkspacePage from "../pages/WorkspacePage";
import DiscoverPage from "../pages/DiscoverPage";
import SettingsPage from "../pages/SettingsPage";
import MessagesPage from "../pages/MessagesPage";
import NotFoundPage from "../pages/NotFoundPage";
// Routes
import UserRoutes from "./UserRoutes";
// Components
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
// Utils
import { authToken } from "../utils/api";
import { updateUserData } from "../utils/user";

const AppRoutes = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const loggedUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const effect = async () => {
      const response = await authToken();

      if (response.status !== 200) {
        navigate("/auth");
      } else {
        await updateUserData();
      }

      setLoading(false);
    };

    effect();
  });

  const colors = require("tailwindcss/colors");

  useEffect(() => {
    if (loggedUser && loggedUser.settings) {
      Object.keys(colors[loggedUser.settings.themeColor]).forEach(
        (shade: string) => {
          document.documentElement.style.setProperty(
            `--theme-color-${shade}`,
            colors[loggedUser.settings.themeColor][shade]
          );
        }
      );

      loggedUser.settings.darkTheme
        ? document.querySelector("html")?.classList.add("dark")
        : document.querySelector("html")?.classList.remove("dark");
    }
  }, [loggedUser, colors]);

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center fixed">
          <Loading />
        </div>
      ) : (
        <>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to={"home"} />} />
              <Route path="home" element={<HomePage />} />
              <Route path="workspace" element={<WorkspacePage />} />
              <Route path="discover" element={<DiscoverPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="settings/*" element={<SettingsPage />} />
              <Route path="u/*" element={<UserRoutes />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
};

export default AppRoutes;
