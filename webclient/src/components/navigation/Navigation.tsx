import { FC, useState } from "react";
import {
  HouseLine,
  PresentationChart,
  PaperPlaneTilt,
  Users,
  Gear,
  CaretDoubleRight,
  Cards,
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
      } transition-all max-w-[250px] flex flex-col border-r-[1px] border-slate-200 dark:border-slate-600 dark:bg-slate-900`}
    >
      <nav className="flex flex-col justify-between h-full relative py-5">
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

          <NavigationLabel expanded={expanded}>Spaces</NavigationLabel>
          <NavigationLink
            variant="navigation"
            icon={<Cards />}
            expanded={expanded}
            to={"/app/workspaces"}
          >
            Workspaces
          </NavigationLink>
        </div>
        <div
          className={`flex justify-end px-4 gap-2 ${
            !expanded ? "flex-col" : ""
          }`}
        >
          <Button
            variant="action"
            tooltip="Sidebar settings"
            className={
              !expanded
                ? "tooltip-rel after:left-[105%] after:translate-y-1/2"
                : "relative tooltip tooltip-t"
            }
          >
            <Gear />
          </Button>
          <Button
            variant="action"
            color="theme"
            onClick={() => {
              toggleExpanded();
            }}
            tooltip="Toggle sidebar"
            className={
              !expanded
                ? "tooltip-rel after:left-[105%] after:translate-y-1/2"
                : "relative tooltip tooltip-t"
            }
          >
            <CaretDoubleRight
              className={`transition-all ${expanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
