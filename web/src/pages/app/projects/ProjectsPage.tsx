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

const ProjectsPage = () => {
  const projects = useSelector((state: any) => state.projects.projects);

  const projectActionEvent = new CustomEvent(events.project);

  return (
    <SitPage header={<h1 className="text-4xl">Projects</h1>}>
      <div className="flex flex-wrap gap-5">
        {projects.map((project: any, index: number) => (
          <Card
            width="300px"
            height="350px"
            className="border border-base-300 !p-0"
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
                <h3>{project.name}</h3>
                <div className="flex items-center justify-between">
                  <span>{project.owner}</span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
        <Card
          width="300px"
          height="350px"
          className="border border-base-300 !p-0 flex flex-col !gap-2 justify-center items-center text-base-700 cursor-pointer"
          onClick={() => {
            document.dispatchEvent(projectActionEvent);
          }}
        >
          <Plus size={32} className="text-base-500" />
          <span>Add project</span>
        </Card>
      </div>
    </SitPage>
  );
};

export default ProjectsPage;
