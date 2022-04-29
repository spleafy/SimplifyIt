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
import AccountRoutes from "./AccountRoutes";
// Components
import Navigation from "../components/Navigation";
import ActionButton from "../components/ActionButton";
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
  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the application
   */
  const navigate = useNavigate();

  /**
   * Logged user
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * Loading state
   * @description Creating a useState variable, so we can toggle the loading state of the page
   */
  const [loading, setLoading] = useState(true);

  /**
   * Search shown state
   * @description Creating a useState variable, so we can toggle the search panel state
   */
  const [searchShown, setSearchShown] = useState(false);

  /**
   * Notifications shown state
   * @description Creating a useState variable, so we can toggle the notifications panel state
   */
  const [notificationsShown, setNotificationsShown] = useState(false);

  /**
   * Account menu shown state
   * @description Creating a useState variable, so we can toggle the account menu state
   */
  const [accountMenuShown, setAccountMenuShown] = useState(false);

  /**
   * Notification state
   * @description Getting the notifications from the redux store
   */
  const notifications = useSelector(
    (state: any) => state.notifications.notifications
  );

  /** Dispatch method
   * @description Creating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * Event listener
   * @description Adding an event listener to the document, so we can listen for each key press and close the menus on key compinations
   * @description We use a debounced function, so we don't have to compute the function on each keypress, but we compute it 150ms after the last keydown event
   */
  document.addEventListener(
    "keydown",
    _.debounce((e: any) => {
      if (e.shiftKey) {
        // If the "shift" key is pressed and the "s" key is pressed at the same time
        if (e.keyCode === 83) {
          // Setting the search panel to shown
          setSearchShown(true);
        }
      }

      // If the "shift" key is pressed and the "escape" key is pressed at the same time
      if (e.keyCode === 27) {
        // Setting the search panel state to not shown
        setSearchShown(false);
        // Setting the notifications panel state to not shown
        setNotificationsShown(false);
        // Setting the account panel state to not shown
        setAccountMenuShown(false);
      }
    }, 150)
  );

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    // Getting the app settings from the localStorage
    const settings = localStorage.getItem("si-settings");

    // If the settings object is empty
    if (!settings) {
      // We create an initial settings object
      const initialSettings = {
        challanges: {
          personal: {
            activeLayout: "cards",
          },
        },
      };

      // We set the initial setting to the LocalStorage
      localStorage.setItem("si-settings", JSON.stringify(initialSettings));
    }
  }, []);

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    const effect = async () => {
      // We authenticate the token
      const response = await authToken();

      // If the token is not valid
      if (!response || response.status !== 200) {
        // We navigate the user to the auth page
        navigate("/auth");
      } else {
        // Setting the user data
        await updateUserData();
        // Setting the user notifications
        await updateUserNotifications();
        // Setting the workspace
        await updateWorkspace();
      }

      setLoading(false);
    };

    effect();
  }, [navigate]);

  /**
   * Tailwind colors
   * @constant
   * @description Get all colors from the custom getColors method in utils/utils.ts
   */
  const colors = getColors("all");

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    // If the user has not passed the initial setup
    if (loggedUser.settings && !loggedUser.settings.initialSetup) {
      // Navigate the user to the initial setup page
      navigate("/initial-setup");
    }
  }, [loggedUser, navigate]);

  /**
   * useEffect hook
   * @description Creating a useEffect hook
   */
  useEffect(() => {
    // If the logged user has settings
    if (loggedUser && loggedUser.settings) {
      // We loop over the color shades and set the css variables for the theme colors
      Object.keys(colors[loggedUser.settings.themeColor]).forEach(
        (shade: string) => {
          document.documentElement.style.setProperty(
            `--theme-color-${shade}`,
            colors[loggedUser.settings.themeColor][shade]
          );
        }
      );

      // Setting the app to dark or white theme based on the user's settings
      loggedUser.settings.darkTheme
        ? document.querySelector("html")?.classList.add("dark")
        : document.querySelector("html")?.classList.remove("dark");
    }
  }, [loggedUser, colors]);

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center fixed">
          <div className="w-9 h-9 flex justify-center items-center">
            <Loading />
          </div>
        </div>
      ) : (
        <>
          {loggedUser.settings.initialSetup ? (
            <>
              <Navigation />
              <div className="flex flex-col w-full">
                <TopNavigation>
                  <span className="w-full first-letter:uppercase"></span>
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="w-[300px] text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-full py-2 px-4 flex items-center justify-between gap-3 text-sm cursor-pointer transition-colors hover:text-theme-500"
                      onClick={() => {
                        setSearchShown(true);
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <MagnifyingGlass />
                        Search
                      </div>
                      <div className="px-3 py-1 text-xs bg-gray-200/60 rounded-md text-slate-800 dark:bg-gray-700 dark:text-slate-200">
                        Shift + S
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-end gap-5">
                    <div className="relative">
                      <ActionButton
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
                              <div className="aspect-square w-[10px] bg-red-500 rounded-full absolute flex justify-center items-center text-white right-[6px] bottom-[6px] border-2 border-white dark:border-slate-900"></div>
                              <div className="aspect-square w-[10px] bg-red-500 rounded-full animate-ping absolute flex justify-center items-center text-white right-[6px] bottom-[6px] border-2 border-white dark:border-slate-900"></div>
                            </>
                          ) : (
                            <></>
                          )
                        ) : (
                          <></>
                        )}
                      </ActionButton>
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
                            to="/app/settings/account"
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
                    <Route path="settings/*" element={<SettingsRoutes />} />
                    <Route path="challanges/*" element={<ChallangesRoutes />} />
                    <Route path="u/*" element={<UserRoutes />} />
                    <Route path="a/*" element={<AccountRoutes />} />
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
