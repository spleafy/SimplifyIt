import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import NavigationLink from "./NavigationLink";
// Redux
import { updateUser } from "../redux/userSlice";
// Utils
import { getColors } from "../utils/utils";

const Navigation = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <header className="h-full w-[400px] flex flex-col">
      <h1
        className="cursor-pointer"
        onClick={() => {
          navigate("/app/home");
        }}
      >
        MeetDev
      </h1>
      <nav className="flex flex-col mt-8 justify-between h-full">
        <div>
          <NavigationLink to={"/app/home"}>Home</NavigationLink>
          {/* <NavigationLink to={"/app/workspace"}>Workspaces</NavigationLink> */}
          <NavigationLink to={"/app/discover"}>Discover</NavigationLink>
          <NavigationLink to={"/app/messages"}>Messages</NavigationLink>
          <NavigationLink to={"/app/settings"}>Settings</NavigationLink>
          <span
            className="py-2 !text-red-600 cursor-pointer flex"
            onClick={() => {
              localStorage.removeItem("X-Auth-Token");
              dispatch(updateUser({}));
              document.querySelector("html")?.classList.remove("dark");
              navigate("/auth/login");
            }}
          >
            Log Out
          </span>
        </div>
        <div
          className="w-full flex cursor-pointer items-center"
          onClick={() => {
            navigate(`/app/u/${loggedUser.username}`);
          }}
        >
          <div
            className="rounded-full w-[45px] aspect-square mr-3 flex justify-center items-center"
            style={{
              backgroundColor: loggedUser.settings
                ? getColors(loggedUser.settings.profileColor)[500]
                : "#f3f3f3",
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
          <span>{loggedUser.username}</span>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
