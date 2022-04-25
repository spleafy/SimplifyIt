import { Routes, Route, Navigate } from "react-router-dom";
// Routes
import SettingsRoutes from "../routes/SettingsRoutes";
// Pages
import FriendsPage from "../pages/user/FriendsPage";
import NotFoundPage from "../pages/NotFoundPage";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"overview"} />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AccountRoutes;
