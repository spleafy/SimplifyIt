import { Routes, Route, Navigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
// Pages
import AccountPage from "./settings/AccountPage";
import NotFoundPage from "./NotFoundPage";
// Components
import Column from "../components/Column";
import NavigationLink from "../components/NavigationLink";

const SettingsPage = () => {
  document.title = `Settings / ${process.env.REACT_APP_TITLE}`;

  return (
    <>
      <Column width="[400px]">
        <h1>Settings</h1>
        <div className="mt-10">
          <NavigationLink to={"account"}>
            Account <FiChevronRight />
          </NavigationLink>
          <NavigationLink to={"security"}>
            Security <FiChevronRight />
          </NavigationLink>
          <NavigationLink to={"application"}>
            Application <FiChevronRight />
          </NavigationLink>
        </div>
      </Column>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"account"} />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </>
  );
};

export default SettingsPage;
