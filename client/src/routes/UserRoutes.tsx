import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
import ProfilePage from "../pages/ProfilePage";
import FollowersPage from "../pages/user/FollowersPage";
import FollowingPage from "../pages/user/FollowingPage";
import NotFoundPage from "../pages/NotFoundPage";

const UserRoutes = () => {
  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={loggedUser.username} />} />
        <Route path=":username" element={<ProfilePage />} />
        <Route path=":username/followers" element={<FollowersPage />} />
        <Route path=":username/following" element={<FollowingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
