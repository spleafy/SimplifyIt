import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import AccountPage from "./settings/AccountPage";
import NotFoundPage from "./NotFoundPage";
// Components
import Column from "../components/Column";
import NavigationLink from "../components/NavigationLink";
import TopNavigation from "../components/TopNavigation";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

const SettingsPage = () => {
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
          <NavigationLink to={"application"} variant={"bordered"}>
            Application
          </NavigationLink>
        </div>
        <div className="flex gap-5 h-10">
          <PrimaryButton>Save Changes</PrimaryButton>
          <SecondaryButton>Reset Changes</SecondaryButton>
        </div>
      </TopNavigation>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"account"} />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default SettingsPage;
