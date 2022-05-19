import { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Column from "../components/basic/Column";
import NavigationLink from "../components/navigation/NavigationLink";
import TopNavigation from "../components/navigation/TopNavigation";
// Pages
import OverviewFriendsPage from "../pages/friends/OverviewFriendsPage";
import FriendRequestsPage from "../pages/friends/FriendRequestsPage";
import NotFoundPage from "../pages/NotFoundPage";
// Utils
import { updateUserFriendRequests } from "../utils/user";

const FriendsRoutes: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Friends / ${process.env.REACT_APP_TITLE}`;

  useEffect(() => {
    const effect = async () => {
      // Setting the user friend requests
      await updateUserFriendRequests();
    };

    effect();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <TopNavigation>
        <div className="flex gap-10 h-full">
          <NavigationLink variant="bordered" to="overview">
            Overview
          </NavigationLink>
          <NavigationLink variant="bordered" to="requests/">
            Received Requests
          </NavigationLink>
          <NavigationLink variant="bordered" to="requests/sent">
            Sent Requests
          </NavigationLink>
        </div>
      </TopNavigation>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"overview"} />} />
          <Route path="overview" element={<OverviewFriendsPage />} />
          <Route
            path="requests"
            element={<FriendRequestsPage type="received" />}
          />
          <Route
            path="requests/sent"
            element={<FriendRequestsPage type="sent" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default FriendsRoutes;
