import { FC, useState } from "react";
import {
  HouseLine,
  PresentationChart,
  PaperPlaneTilt,
  Users,
  UsersThree,
  Trophy,
  CaretDoubleRight,
} from "phosphor-react";
// Components
import NavigationLink from "./NavigationLink";
import NavigationLabel from "./NavigationLabel";
import Button from "../basic/Button";

const Navigation: FC = () => {
  const settings = JSON.parse(localStorage.getItem("si-settings") as string);

  const [expanded, setExpanded] = useState(settings.navigation.expanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    settings.navigation.expanded = !expanded;
    localStorage.setItem("si-settings", JSON.stringify(settings));
  };

  return (
    <header
      className={`${
        expanded ? "w-[250px] min-w-[250px]" : "w-[67px] min-w-[67px]"
      } transition-all max-w-[250px] flex flex-col py-5 border-r-[1px] border-slate-200 dark:border-slate-600 dark:bg-slate-900`}
    >
      <nav className="flex flex-col justify-between h-full relative">
        <div>
          <NavigationLabel expanded={expanded}>Home</NavigationLabel>
          <NavigationLink
            variant="navigation"
            icon={<HouseLine />}
            expanded={expanded}
            to={"/app/home"}
          >
            Home
          </NavigationLink>
          <NavigationLink
            variant="navigation"
            icon={<PresentationChart />}
            expanded={expanded}
            to={"/app/dashboard"}
          >
            Dashboard
          </NavigationLink>
          <NavigationLabel expanded={expanded}>Social</NavigationLabel>
          <NavigationLink
            variant="navigation"
            icon={<PaperPlaneTilt />}
            expanded={expanded}
            to={"/app/messages"}
          >
            Messages
          </NavigationLink>
          <NavigationLink
            variant="navigation"
            icon={<Users />}
            expanded={expanded}
            to={"/app/friends"}
          >
            Friends
          </NavigationLink>
          <NavigationLink
            variant="navigation"
            icon={<UsersThree />}
            expanded={expanded}
            to={"/app/teams"}
          >
            Teams
          </NavigationLink>
          <NavigationLink
            variant="navigation"
            icon={<Trophy />}
            expanded={expanded}
            to={"/app/challenges"}
          >
            Challenges
          </NavigationLink>
        </div>
        <Button
          variant="action"
          color="theme"
          className="absolute bottom-0 right-4"
          onClick={() => {
            toggleExpanded();
          }}
        >
          <CaretDoubleRight
            className={`transition-all ${expanded ? "rotate-180" : ""}`}
          />
        </Button>
      </nav>
    </header>
  );
};

export default Navigation;
