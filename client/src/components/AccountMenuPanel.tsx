import { Dispatch, FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import Card from "./basic/Card";
import NavigationLink from "./navigation/NavigationLink";
import OutsideEventHandler from "./OutsideEventHandler";
// Redux
import { updateUser } from "../redux/userSlice";
import { updateNotifications } from "../redux/notificationSlice";
import {
  updateSentFriendRequests,
  updateReceivedFriendRequests,
} from "../redux/friendRequestSlice";
import { updateFriends } from "../redux/friendSlice";
// Utils
import { UserType } from "../utils/types";

interface AccountMenuPanelProps {
  setShown: Dispatch<boolean>;
}

const AccountMenuPanel: FC<AccountMenuPanelProps> = ({ setShown }) => {
  const navigate = useNavigate();

  /** Dispatch method
   * @description Creating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  const loggedUser: UserType = useSelector(
    (state: RootStateOrAny) => state.user.user
  );

  return (
    <OutsideEventHandler
      onEvent={() => {
        setShown(false);
      }}
    >
      {" "}
      <Card variant="panel" width="200px">
        <NavigationLink to={`/app/u/${loggedUser.username}`} variant={"basic"}>
          My Account
        </NavigationLink>
        <NavigationLink to="/app/settings/account" variant={"basic"}>
          My Settings
        </NavigationLink>
        <span
          className="py-2 flex items-center justify-between transition-colors px-3 text-red-700 dark:text-red-700"
          onClick={() => {
            localStorage.removeItem("X-Auth-Token");
            dispatch(updateUser({}));
            dispatch(updateNotifications([]));
            dispatch(updateReceivedFriendRequests([]));
            dispatch(updateSentFriendRequests([]));
            dispatch(updateFriends([]));
            document.querySelector("html")?.classList.remove("dark");
            navigate("/auth/login");
          }}
        >
          Log out
        </span>
      </Card>
    </OutsideEventHandler>
  );
};

export default AccountMenuPanel;
