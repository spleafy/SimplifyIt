import { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  House,
  ChartLine,
  CheckSquareOffset,
  Bell,
  GearSix,
  Plus,
  SquaresFour,
  CaretRight,
} from "phosphor-react";
// Components
import SitNavItem from "../components/navigation/SitNavItem";
import SitShape from "../components/basic/SitShape";
// Types
import { SitComponent } from "../types";
// Utils
import { events } from "../utils/utils";

const SitNav: FC<SitComponent> = ({ className, style }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const projects = useSelector((state: any) => state.projects.projects);

  const projectActionEvent = new CustomEvent(events.project);

  return (
    <nav
      className={`flex flex-col justify-between items-center h-full transition-all border-r border-base-300 gap-20 ${
        expanded
          ? "w-[240px] min-w-[240px] p-5"
          : "w-[64px] : min-w-[64px] py-5"
      } ${className ? className : ""}`}
      style={style}
    >
      <div className="flex flex-col gap-5 w-full items-center">
        {/* size={expanded ? 24 : 20} className="transition-all"  */}
        <SitNavItem
          to="home"
          icon={<House size={24} />}
          expanded={expanded}
          tooltip="Home"
        >
          Home
        </SitNavItem>
        <SitNavItem
          to="dashboard"
          icon={<ChartLine size={24} />}
          expanded={expanded}
          tooltip="Dashboard"
        >
          Dashboard
        </SitNavItem>
        <SitNavItem
          to="tasks"
          icon={<CheckSquareOffset size={24} />}
          expanded={expanded}
          tooltip="Tasks | 12"
        >
          <div className="flex justify-between items-center">
            Tasks{" "}
            <div className="flex items-center justify-center w-6 aspect-square bg-primary-500 text-white rounded-md text-xs">
              12
            </div>
          </div>
        </SitNavItem>
        <SitNavItem
          to="notifications"
          icon={<Bell size={24} />}
          expanded={expanded}
          tooltip="Notifications | 48"
        >
          <div className="flex justify-between items-center">
            Notifications
            <div className="flex items-center justify-center w-6 aspect-square bg-primary-500 text-white rounded-md text-xs">
              48
            </div>
          </div>
        </SitNavItem>
        <SitNavItem
          to="settings"
          icon={<GearSix size={24} />}
          expanded={expanded}
          tooltip="Settings"
        >
          Settings
        </SitNavItem>
      </div>
      <div className="flex w-full flex-col gap-16 justify-end items-center grow">
        <div className="flex flex-col gap-3 w-full items-center">
          <div
            className={`flex w-full items-center ${
              expanded ? "justify-between" : " justify-center"
            }`}
          >
            {expanded && (
              <span className="text-sm text-base-900">Projects</span>
            )}
            <div
              className={`flex items-center justify-center aspect-square border border-base-300 cursor-pointer rounded-lg ${
                expanded ? "w-6" : "w-10"
              }`}
              onClick={() => {
                document.dispatchEvent(projectActionEvent);
              }}
            >
              <Plus size={16} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-3 max-h-[324px] items-center">
            <SitNavItem
              to="projects/"
              icon={<SquaresFour size={24} />}
              expanded={expanded}
              tooltip="All Projects"
            >
              All Projects
            </SitNavItem>
            {projects.map((project: any, index: number) => (
              <SitNavItem
                to={`projects/${project._id}`}
                icon={
                  <div
                    className="w-6 aspect-square flex justify-center items-center"
                    style={{ color: project.settings.color }}
                  >
                    <SitShape
                      shape={project.settings.shape}
                      size={16}
                      weight="bold"
                    />
                  </div>
                }
                expanded={expanded}
                tooltip={project.name}
                key={index}
              >
                <span className="block text-inherit text-sm overflow-hidden overflow-ellipsis max-w-[90%]">
                  {project.name}
                </span>
              </SitNavItem>
            ))}
          </div>
        </div>
        <div
          className={`flex items-center rounded-lg text-primary-500 hover:bg-primary-100 justify-center aspect-square w-10 cursor-pointer transition-all ${
            expanded ? "self-end" : "self-center"
          }`}
          onClick={toggleExpanded}
        >
          <CaretRight
            size={20}
            weight="bold"
            className={`transition-all ${expanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default SitNav;
