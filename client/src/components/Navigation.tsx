import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
// Components
import NavigationLink from "./NavigationLink";
import ActionButton from "./ActionButton";
// Redux
import { updateUser } from "../redux/userSlice";
// Utils
import { getColors } from "../utils/utils";

const Navigation = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state: any) => state.user.user);

  const [expandedSidebar, setExpandedSidebar] = useState(true);

  return (
    <>
      <header className="flex justify-between items-center px-5 pb-5">
        <h1
          className="cursor-pointer"
          onClick={() => {
            navigate("/app/home");
          }}
        >
          MeetDev
        </h1>
        <nav className="flex justify-between h-full gap-5">
          <NavigationLink to={"/app/home"}>Home</NavigationLink>
          {/* <NavigationLink to={"/app/workspace"}>Workspaces</NavigationLink> */}
          <NavigationLink to={"/app/discover"}>Discover</NavigationLink>
          <NavigationLink to={"/app/messages"}>Messages</NavigationLink>
          <NavigationLink to={"/app/settings"}>Settings</NavigationLink>
          <span
            className="py-2 !text-red-600 cursor-pointer hidden"
            onClick={() => {
              localStorage.removeItem("X-Auth-Token");
              dispatch(updateUser({}));
              document.querySelector("html")?.classList.remove("dark");
              navigate("/auth/login");
            }}
          >
            Log Out
          </span>
        </nav>
        <div className="flex cursor-pointer items-center gap-5">
          <div className="">
            <ActionButton>
              <FiBell size={18} className="my-1" />
            </ActionButton>
          </div>
          <div
            className="rounded-full w-[45px] aspect-square mr-3 flex justify-center items-center"
            style={{
              backgroundColor: loggedUser.settings
                ? getColors(loggedUser.settings.profileColor)[500]
                : "#f3f3f3",
            }}
            onClick={() => {
              navigate(`/app/u/${loggedUser.username}`);
            }}
          >
            {loggedUser.fullname ? (
              <h1 className="text-white text-sm">
                {loggedUser.fullname.split(" ")[0].charAt(0)}
                {loggedUser.fullname.split(" ")[1].charAt(0)}
              </h1>
            ) : (
              <></>
            )}
          </div>
          {/* <span>{loggedUser.username}</span> */}
        </div>
      </header>
    </>
  );
};

export default Navigation;
