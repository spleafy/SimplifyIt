import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MagnifyingGlass, Bell, Trash } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
// Redux
import { updateUser } from "../redux/userSlice";
import { updateNotifications } from "../redux/notificationSlice";
// Pages
import HomePage from "../pages/HomePage";
import WorkspacePage from "../pages/WorkspacePage";
import MessagesPage from "../pages/MessagesPage";
import PeoplePage from "../pages/PeoplePage";
import TeamsPage from "../pages/TeamsPage";
import NotFoundPage from "../pages/NotFoundPage";
// Routes
import UserRoutes from "./UserRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ChallangesRoutes from "./ChallangesRoutes";
// Components
import Navigation from "../components/Navigation";
import TopNavigation from "../components/TopNavigation";
import NavigationLink from "../components/NavigationLink";
import Loading from "../components/Loading";
import SearchPanel from "../components/SearchPanel";
import Panel from "../components/Panel";
import ProfilePicture from "../components/ProfilePicture";
// Utils
import { authToken } from "../utils/api";
import {
  updateUserData,
  updateUserNotifications,
  updateNotificationStateAndUpdate,
  updateWorkspace,
} from "../utils/user";
import { getColors, defineDate } from "../utils/utils";
// Lodash
import _ from "lodash";

const AppRoutes = () => {
  const navigate = useNavigate();

  const loggedUser = useSelector((state: any) => state.user.user);

  const [loading, setLoading] = useState(true);

  const [searchShown, setSearchShown] = useState(false);

  const [notificationsShown, setNotificationsShown] = useState(false);

  const [accountMenuShown, setAccountMenuShown] = useState(false);

  const notifications = useSelector(
    (state: any) => state.notifications.notifications
  );

  const dispatch = useDispatch();

  document.addEventListener(
    "keydown",
    _.debounce((e) => {
      if (e.shiftKey) {
        if (e.keyCode === 83) {
          setSearchShown(true);
        }
      }

      if (e.keyCode === 27) {
        setSearchShown(false);
        setNotificationsShown(false);
        setAccountMenuShown(false);
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
        await updateUserNotifications();
        await updateWorkspace();
      }

      setLoading(false);
    };

    effect();
  }, [navigate]);

  const colors = getColors("all");

  useEffect(() => {
    if (loggedUser.settings && !loggedUser.settings.initialSetup) {
      navigate("/initial-setup");
    }
  }, [loggedUser, navigate]);

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
          {loggedUser.settings.initialSetup ? (
            <>
              <Navigation />
              <div className="flex flex-col w-full">
                <TopNavigation>
                  <span className="w-full">Top Navigation</span>
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="w-[300px] text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-md py-2 px-3 flex items-center justify-between gap-3 text-sm cursor-pointer transition-colors hover:text-theme-500"
                      onClick={() => {
                        setSearchShown(true);
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <MagnifyingGlass />
                        Search
                      </div>
                      <div className="px-2 py-1 text-xs bg-gray-200/60 rounded-md text-slate-800 dark:bg-gray-700 dark:text-slate-200">
                        Shift + S
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-end gap-5">
                    <div className="relative">
                      <div
                        className="flex items-center justify-center text-xl text-slate-600 aspect-square w-[35px] rounded-md transition-colors cursor-pointer hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-slate-800"
                        onClick={() => {
                          setNotificationsShown(!notificationsShown);
                        }}
                      >
                        <Bell />
                        {notifications.length > 0 ? (
                          notifications.some(
                            (notification: any) => !notification.opened
                          ) ? (
                            <>
                              <div className="aspect-square w-[10px] bg-red-500 rounded-full absolute flex justify-center items-center text-white right-[6px] bottom-[6px] border-2 border-white"></div>
                              <div className="aspect-square w-[10px] bg-red-500 rounded-full animate-ping absolute flex justify-center items-center text-white right-[6px] bottom-[6px] border-2 border-white"></div>
                            </>
                          ) : (
                            <></>
                          )
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
                                  <div
                                    className={`w-full flex items-center text-sm cursor-pointer px-3 py-1 rounded-md mt-2 first:mt-0 relative`}
                                    key={index}
                                    onClick={async () => {
                                      if (!notification.opened) {
                                        await updateNotificationStateAndUpdate(
                                          notification._id
                                        );
                                      }

                                      setNotificationsShown(false);
                                    }}
                                  >
                                    <div
                                      className={`absolute left-0 top-50 w-[5px] h-[5px] rounded-full aspect-square bg-theme-400 ${
                                        !notification.opened ? "flex" : "hidden"
                                      }`}
                                    >
                                      <div className="w-full h-full rounded-full bg-theme-400 animate-ping"></div>
                                    </div>
                                    {notification.type === "Follow" ? (
                                      <div
                                        className="flex justify-between items-center w-full"
                                        onClick={() => {
                                          navigate(
                                            `/app/u/${notification.data.username}`
                                          );
                                        }}
                                      >
                                        <div className="flex gap-5 items-center">
                                          <div className="w-[35px]">
                                            <ProfilePicture
                                              user={notification.data}
                                              size="xs"
                                            />
                                          </div>
                                          <div>
                                            <strong>
                                              {notification.data.username}
                                            </strong>{" "}
                                            started following you!
                                          </div>
                                        </div>
                                        <span className="text-slate-500">
                                          {defineDate(notification.date)}
                                        </span>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    <div className="ml-2 text-base hover:text-red-500 hover:bg-slate-100/50 dark:hover:bg-slate-700 p-1 rounded-md transition-colors">
                                      <Trash />
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div className="w-full h-[200px] flex items-center justify-center">
                              <span className="text-slate-700">
                                No notifications!
                              </span>
                            </div>
                          )}
                        </Panel>
                      </div>
                    </div>
                    <div
                      className="w-[35px] cursor-pointer relative"
                      onClick={() => {
                        setAccountMenuShown(!accountMenuShown);
                      }}
                    >
                      <ProfilePicture user={loggedUser} size="xs" />
                      <div
                        className={`${
                          accountMenuShown ? "flex" : "hidden"
                        } absolute right-0 top-[50px]`}
                      >
                        <Panel width="200px">
                          <NavigationLink
                            to={`/app/u/${loggedUser.username}`}
                            variant={"basic"}
                          >
                            My Account
                          </NavigationLink>
                          <NavigationLink
                            to={`/app/settings/account`}
                            variant={"basic"}
                          >
                            My Settings
                          </NavigationLink>
                          <span
                            className="py-2 flex items-center justify-between transition-colors px-3 text-red-700 dark:text-red-700"
                            onClick={() => {
                              localStorage.removeItem("X-Auth-Token");
                              dispatch(updateUser({}));
                              dispatch(updateNotifications([]));
                              document
                                .querySelector("html")
                                ?.classList.remove("dark");
                              navigate("/auth/login");
                            }}
                          >
                            Log out
                          </span>
                        </Panel>
                      </div>
                    </div>
                  </div>
                </TopNavigation>
                <main>
                  <Routes>
                    <Route path="/" element={<Navigate to={"home"} />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="workspace" element={<WorkspacePage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="people" element={<PeoplePage />} />
                    <Route path="teams" element={<TeamsPage />} />
                    <Route path="challanges/*" element={<ChallangesRoutes />} />
                    <Route path="settings/*" element={<SettingsRoutes />} />
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
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default AppRoutes;
