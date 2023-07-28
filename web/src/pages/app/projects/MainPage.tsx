import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "@prismane/core";
import { Plus } from "phosphor-react";
// Layouts
import SitPage from "../../../layouts/SitPage";
// Components
import SitShape from "../../../components/basic/SitShape";
// Utils
import { events } from "../../../utils/utils";

const MainPage = () => {
  const projects = useSelector((state: any) => state.projects.projects);

  const createProjectActionEvent = new CustomEvent(events.project.create);

  return (
    <SitPage header={<h1 className="text-4xl font-bold">All Projects</h1>}>
      <div className="flex flex-wrap gap-5">
        {projects.map((project: any, index: number) => (
          <Card
            width="300px"
            height="350px"
            className="border border-base-300 !p-0 hover:border-primary-500 hover:bg-primary-100 transition-all"
            key={index}
          >
            <Link to={project._id} className="flex flex-col w-full h-full">
              <div
                className="flex w-full h-2/3 items-center justify-center overflow-hidden"
                style={{ backgroundColor: project.settings.color }}
              >
                <SitShape
                  shape={project.settings.shape}
                  color="white"
                  className="w-1/3 h-1/3"
                />
              </div>
              <div className="flex flex-col gap-2 grow p-4">
                <span className="font-bold text-lg line-clamp-1">
                  {project.name}
                </span>
                <div className="flex items-center justify-between">
                  <span>
                    Last updated on:{" "}
                    {new Date(project.updatedAt).toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
        <Card
          width="300px"
          height="350px"
          className="border border-base-300 !p-0 flex flex-col !gap-2 justify-center items-center text-base-700 cursor-pointer hover:border-primary-500 hover:bg-primary-100 group transition-all"
          onClick={() => {
            document.dispatchEvent(createProjectActionEvent);
          }}
        >
          <Plus
            size={32}
            className="text-base-500 group-hover:text-primary-500 transition-all"
          />
          <span className="group-hover:text-primary-500 transition-all">
            Add project
          </span>
        </Card>
      </div>
    </SitPage>
  );
};

export default MainPage;
