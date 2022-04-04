import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch, FiBell } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// Redux
// import { updateUser } from "../redux/userSlice";
// Pages
import HomePage from "../pages/HomePage";
import WorkspacePage from "../pages/WorkspacePage";
import SettingsPage from "../pages/SettingsPage";
import MessagesPage from "../pages/MessagesPage";
import NotFoundPage from "../pages/NotFoundPage";
// Routes
import UserRoutes from "./UserRoutes";
// Components
import Navigation from "../components/Navigation";
import TopNavigation from "../components/TopNavigation";
import Loading from "../components/Loading";
import SearchPanel from "../components/SearchPanel";
import Panel from "../components/Panel";
import ProfilePicture from "../components/ProfilePicture";
// Utils
import { authToken, fetchNotifications } from "../utils/api";
import { updateUserData } from "../utils/user";
import { getColors } from "../utils/utils";
// Lodash
import _ from "lodash";

const AppRoutes = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [searchShown, setSearchShown] = useState(false);

  const [notificationsShown, setNotificationsShown] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const loggedUser = useSelector((state: any) => state.user.user);

  // const dispatch = useDispatch();

  document.addEventListener(
    "keydown",
    _.debounce((e) => {
      if (e.shiftKey) {
        if (e.keyCode === 83) {
          setSearchShown(true);
        }
      }

      if (e.keyCode === 27) {
        setNotificationsShown(false);
      }
    }, 150)
  );

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

  useEffect(() => {
    const effect = async () => {
      const response = await fetchNotifications();

      setNotifications(response.data.notifications);
    };

    effect();
  }, []);

  const colors = getColors("all");

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
          <div className="flex flex-col w-full">
            <TopNavigation>
              <span className="w-full">Top Navigation</span>
              <div className="flex justify-center items-center w-full">
                <div
                  className="w-[300px] text-slate-600 bg-slate-100 rounded-md py-2 px-3 flex items-center justify-between gap-3 text-sm cursor-pointer transition-colors hover:text-theme-500"
                  onClick={() => {
                    setSearchShown(true);
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <FiSearch />
                    Search
                  </div>
                  <div className="px-2 py-1 text-xs bg-gray-200 rounded-md text-slate-800">
                    Shift + S
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full justify-end gap-5">
                <div className="relative">
                  <div
                    className="flex items-center justify-center text-xl text-slate-700 aspect-square w-[35px] rounded-md transition-colors cursor-pointer hover:bg-slate-200/70"
                    onClick={() => {
                      setNotificationsShown(true);
                    }}
                  >
                    <FiBell />
                    {notifications.some(
                      (notification: any) => notification.opened === false
                    ) ? (
                      <>
                        <div className="aspect-square w-[10px] bg-red-500 rounded-full absolute flex justify-center items-center text-white right-2 bottom-2 border-2 border-white"></div>
                        <div className="aspect-square w-[10px] bg-red-500 rounded-full animate-ping absolute flex justify-center items-center text-white right-2 bottom-2 border-2 border-white"></div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className={`absolute top-[50px] right-0 ${
                      notificationsShown ? "flex" : "hidden"
                    }`}
                  >
                    <Panel width="400px">
                      {notifications.length > 0 ? (
                        <>
                          {notifications.map(
                            (notification: any, index: number) => (
                              <div key={index}>
                                {notification.type === "Action" ? (
                                  <div className="w-full flex items-center justify-between text-sm cursor-pointer hover:bg-theme-50 px-3 py-1 rounded-md">
                                    <div className="flex gap-5 items-center">
                                      <div className="w-[35px]">
                                        <ProfilePicture
                                          user={notification.data}
                                          size="xs"
                                        />
                                      </div>
                                      <div>{notification.message}</div>
                                    </div>
                                    <span className="text-slate-700">
                                      Today
                                    </span>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <h1>No notifications!</h1>
                        </div>
                      )}
                    </Panel>
                  </div>
                </div>
                <div
                  className="w-[35px] cursor-pointer"
                  onClick={() => {
                    navigate(`/app/u/${loggedUser.username}`);
                  }}
                >
                  <ProfilePicture user={loggedUser} size="xs" />
                </div>
              </div>
            </TopNavigation>
            <main>
              <Routes>
                <Route path="/" element={<Navigate to={"home"} />} />
                <Route path="home" element={<HomePage />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="settings/*" element={<SettingsPage />} />
                <Route path="u/*" element={<UserRoutes />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            {searchShown ? (
              <SearchPanel shown={searchShown} setShown={setSearchShown} />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AppRoutes;
