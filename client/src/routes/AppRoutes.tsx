import { useEffect, useState, FC } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MagnifyingGlass, Bell } from "phosphor-react";
import { useSelector, RootStateOrAny } from "react-redux";

// Pages
import HomePage from "../pages/HomePage";
import WorkspacePage from "../pages/WorkspacePage";
import MessagesPage from "../pages/MessagesPage";
import NotFoundPage from "../pages/NotFoundPage";
// Routes
import UserRoutes from "./UserRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ChallengesRoutes from "./ChallengesRoutes";
import FriendsRoutes from "./FriendsRoutes";
import TeamRoutes from "./TeamRoutes";
// Components
import Navigation from "../components/navigation/Navigation";
import TopNavigation from "../components/navigation/TopNavigation";
import Loading from "../components/basic/Loading";
import SearchPanel from "../components/SearchPanel";
import Button from "../components/basic/Button";
import ProfilePicture from "../components/basic/ProfilePicture";
import NotificationsPanel from "../components/NotificationsPanel";
import AccountMenuPanel from "../components/AccountMenuPanel";
// Utils
import { authToken } from "../utils/api";
import {
  updateUserData,
  updateUserNotifications,
  updateWorkspace,
  updateUserFriends,
} from "../utils/user";
import { getColors } from "../utils/utils";
// Lodash
import _ from "lodash";
import { NotificationType } from "../utils/types";

const AppRoutes: FC = () => {
  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the application
   */
  const navigate = useNavigate();

  /**
   * Logged user
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

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
    (state: RootStateOrAny) => state.notifications.notifications
  );

  /**
   * Event listener
   * @description Adding an event listener to the document, so we can listen for each key press and close the menus on key compinations
   * @description We use a debounced function, so we don't have to compute the function on each keypress, but we compute it 150ms after the last keydown event
   */
  document.addEventListener(
    "keydown",
    _.debounce((e: KeyboardEvent) => {
      if (e.shiftKey) {
        // If the "shift" key is pressed and the "s" key is pressed at the same time
        if (e.keyCode === 83) {
          // Setting the search panel to shown
          setSearchShown(true);
        }
      }

      // If the "escape" key is pressed
      if (e.keyCode === 27) {
        const event = new Event("escape");

        document.dispatchEvent(event);
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
        navigation: {
          expanded: true,
        },
        challenges: {
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
        // Setting the user friends
        await updateUserFriends();
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
      Object.keys(colors[loggedUser.settings.profile.themeColor]).forEach(
        (shade: string) => {
          const hex = colors[loggedUser.settings.profile.themeColor][shade]
            .split("#")[1]
            .match(/.{1,2}/g);

          document.documentElement.style.setProperty(
            `--theme-color-${shade}`,
            `${parseInt(hex[0], 16)} ${parseInt(hex[1], 16)} ${parseInt(
              hex[2],
              16
            )}`
          );
        }
      );

      // Setting the app to dark or white theme based on the user's settings
      loggedUser.settings.profile.darkTheme
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
            <div className="flex flex-col w-full">
              <TopNavigation>
                <div className="w-full">
                  <h1
                    className="w-fit first-letter:uppercase cursor-pointer"
                    onClick={() => {
                      navigate("/app/home");
                    }}
                  >
                    SimplifyIt
                  </h1>
                </div>
                <div className="flex justify-center items-center w-full">
                  <div
                    className="w-[300px] text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-full py-2 pr-2 pl-3 flex items-center justify-between gap-3 text-sm cursor-pointer transition-colors hover:text-theme-500"
                    onClick={() => {
                      setSearchShown(true);
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <MagnifyingGlass />
                      Search
                    </div>
                    <div className="px-3 py-1 text-xs bg-slate-200/50 text-slate-800 dark:bg-slate-700/50 dark:text-slate-200 rounded-full">
                      Shift + S
                    </div>
                  </div>
                </div>
                <div className="flex items-center w-full justify-end gap-5">
                  <div className="relative">
                    <Button
                      variant="action"
                      onClick={() => {
                        setNotificationsShown(!notificationsShown);
                      }}
                    >
                      <Bell />
                      {notifications.length > 0 ? (
                        notifications.some(
                          (notification: NotificationType) =>
                            !notification.opened
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
                    </Button>
                    {notificationsShown ? (
                      <div
                        className={`absolute top-[50px] right-0`}
                        onBlur={() => {
                          console.log("blur");
                        }}
                      >
                        <NotificationsPanel setShown={setNotificationsShown} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="w-[35px] cursor-pointer relative"
                    onClick={() => {
                      setAccountMenuShown(!accountMenuShown);
                    }}
                  >
                    <ProfilePicture
                      color={loggedUser.settings.profile.profileColor}
                      name={loggedUser.fullname}
                      size="xs"
                    />
                    {accountMenuShown ? (
                      <div className="flex absolute right-0 top-[50px]">
                        <AccountMenuPanel setShown={setAccountMenuShown} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </TopNavigation>
              <div className="flex h-[calc(100%-55px)] w-full">
                <Navigation />
                <div className="flex flex-col w-full">
                  <main>
                    <Routes>
                      <Route path="/" element={<Navigate to={"home"} />} />
                      <Route path="home" element={<HomePage />} />
                      <Route path="workspace" element={<WorkspacePage />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="friends/*" element={<FriendsRoutes />} />
                      <Route path="teams/*" element={<TeamRoutes />} />
                      <Route path="settings/*" element={<SettingsRoutes />} />
                      <Route
                        path="challenges/*"
                        element={<ChallengesRoutes />}
                      />
                      <Route path="u/*" element={<UserRoutes />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  {searchShown ? (
                    <SearchPanel setShown={setSearchShown} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default AppRoutes;
