import { useNavigate } from "react-router-dom";
// Components
import NavigationLink from "./NavigationLink";
// import { FiHome } from "react-icons/fi";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <header className="h-full w-[250px] max-w-[250px] min-w-[250px] flex flex-col p-5 border-r-[1px] border-slate-200 dark:border-slate-600">
      <h1
        className="cursor-pointer"
        onClick={() => {
          navigate("/app/home");
        }}
      >
        SimplifyIt
      </h1>
      <nav className="flex flex-col mt-8 justify-between h-full">
        <div>
          <NavigationLink to={"/app/home"}>Home</NavigationLink>
          {/* <NavigationLink to={"/app/workspace"}>Workspaces</NavigationLink> */}
          <NavigationLink to={"/app/messages"}>Messages</NavigationLink>
          <NavigationLink to={"/app/settings"}>Settings</NavigationLink>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
