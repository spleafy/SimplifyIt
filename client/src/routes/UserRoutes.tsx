import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

const UserRoutes = () => {
  /**
   * Logged user
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={loggedUser.username} />} />
        <Route path=":username" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
