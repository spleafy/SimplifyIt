import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HouseLine,
  PresentationChart,
  PaperPlaneTilt,
  Users,
  UsersThree,
  Trophy,
} from "phosphor-react";
// Components
import NavigationLink from "./NavigationLink";
import NavigationLabel from "./NavigationLabel";

const Navigation = () => {
  const navigate = useNavigate();

  const workspace = useSelector((state: any) => state.workspace.workspace);

  console.log(workspace);

  return (
    <header className="h-full w-[250px] max-w-[250px] min-w-[250px] flex flex-col py-5 border-r-[1px] border-slate-200 dark:border-slate-600">
      <h1
        className="cursor-pointer px-8"
        onClick={() => {
          navigate("/app/home");
        }}
      >
        SimplifyIt
      </h1>
      <nav className="flex flex-col mt-8 justify-between h-full">
        <div>
          <NavigationLabel>Home</NavigationLabel>
          <NavigationLink to={"/app/home"}>
            <div className="flex gap-3 items-center">
              <HouseLine />
              Home
            </div>
          </NavigationLink>
          <NavigationLink to={"/app/dashboard"}>
            <div className="flex gap-3 items-center">
              <PresentationChart />
              Dashboard
            </div>
          </NavigationLink>
          <NavigationLabel>Communication</NavigationLabel>
          <NavigationLink to={"/app/messages"}>
            <div className="flex gap-3 items-center">
              <PaperPlaneTilt />
              Messages
            </div>
          </NavigationLink>
          <NavigationLabel>People</NavigationLabel>
          <NavigationLink to={"/app/people"}>
            <div className="flex gap-3 items-center">
              <Users />
              People
            </div>
          </NavigationLink>
          <NavigationLink to={"/app/teams"}>
            <div className="flex gap-3 items-center">
              <UsersThree />
              Teams
            </div>
          </NavigationLink>
          <NavigationLink to={"/app/challanges"}>
            <div className="flex gap-3 items-center">
              <Trophy />
              Challanges
            </div>
          </NavigationLink>
        </div>
      </nav>
      <div className="self-end flex w-full h-[50px] bg-slate-200 rounded-md cursor-pointer opacity-70"></div>
    </header>
  );
};

export default Navigation;
