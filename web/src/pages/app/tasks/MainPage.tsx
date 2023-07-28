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
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const taskActionEvent = new CustomEvent(events.task);

  return (
    <SitPage header={<h1 className="text-4xl font-bold">Tasks</h1>}>
      <div className="flex flex-wrap gap-5">
        {tasks.map((task: any, index: number) => (
          <Card
            width="350px"
            height="200px"
            className="border border-base-300 !p-0 cursor-pointer hover:border-primary-500 hover:bg-primary-100 group transition-all"
            key={index}
          >
            <Link
              to={task._id}
              className="w-full h-full p-3 flex flex-col gap-2"
            >
              <div className="flex gap-4">
                <div
                  className="w-16 h-16 !aspect-square rounded-md flex items-center justify-center text-white"
                  style={{
                    background: task.settings.color,
                  }}
                >
                  <SitShape shape={task.settings.shape} size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg line-clamp-1">
                    {task.name}
                  </span>
                  <span>
                    Created on:{" "}
                    {new Date(task.createdAt).toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
              <span className="line-clamp-2">{task.description}</span>
            </Link>
          </Card>
        ))}
        <Card
          width="350px"
          height="200px"
          className="border border-base-300 !p-0 flex flex-col !gap-2 justify-center items-center text-base-700 cursor-pointer hover:border-primary-500 hover:bg-primary-100 group transition-all"
          onClick={() => {
            document.dispatchEvent(taskActionEvent);
          }}
        >
          <Plus
            size={32}
            className="text-base-500 group-hover:text-primary-500 transition-all"
          />
          <span className="group-hover:text-primary-500 transition-all">
            Add task
          </span>
        </Card>
      </div>
    </SitPage>
  );
};

export default MainPage;
