import { Dispatch, FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Gear, User, SignOut } from "phosphor-react";
// Components
import Card from "./basic/Card";
import NavigationLink from "./navigation/NavigationLink";
import OutsideEventHandler from "./OutsideEventHandler";
import Separator from "./basic/Separator";
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

interface AccountMenuDropdownProps {
  setShown: Dispatch<boolean>;
}

const AccountMenuDropdown: FC<AccountMenuDropdownProps> = ({ setShown }) => {
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
      <Card variant="dropdown" width="200px">
        <NavigationLink
          to={`/app/u/${loggedUser.username}`}
          icon={<User />}
          className="hover:!bg-theme-100/50 dark:hover:!bg-theme-900/20"
        >
          My Account
        </NavigationLink>
        <NavigationLink
          to="/app/settings/account"
          icon={<Gear />}
          className="hover:!bg-theme-100/50 dark:hover:!bg-theme-900/20"
        >
          My Settings
        </NavigationLink>
        <Separator />
        <span
          className="py-2 flex items-center gap-3 transition-colors px-4 !text-red-500 hover:!bg-red-100/50 dark:hover:!bg-red-900/20 rounded-lg"
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
          <SignOut />
          Log out
        </span>
      </Card>
    </OutsideEventHandler>
  );
};

export default AccountMenuDropdown;
