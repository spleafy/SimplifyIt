import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import AccountSettingsPage from "../pages/settings/AccountSettingsPage";
import SecuritySettingsPage from "../pages/settings/SecuritySettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
// Components
import Column from "../components/Column";
import NavigationLink from "../components/NavigationLink";
import TopNavigation from "../components/TopNavigation";

const SettingsRoutes = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Settings / ${process.env.REACT_APP_TITLE}`;

  return (
    <div className="flex flex-col w-full">
      <TopNavigation>
        <div className="flex gap-10 h-full">
          <NavigationLink to={"account"} variant={"bordered"}>
            Account
          </NavigationLink>
          <NavigationLink to={"security"} variant={"bordered"}>
            Security
          </NavigationLink>
          <NavigationLink to={"notifications"} variant={"bordered"}>
            Notifications
          </NavigationLink>
          <NavigationLink to={"sounds"} variant={"bordered"}>
            Sounds
          </NavigationLink>
        </div>
      </TopNavigation>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"account"} />} />
          <Route path="account" element={<AccountSettingsPage />} />
          <Route path="security" element={<SecuritySettingsPage />} />
          <Route path="notifications" element={<AccountSettingsPage />} />
          <Route path="sounds" element={<AccountSettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default SettingsRoutes;
