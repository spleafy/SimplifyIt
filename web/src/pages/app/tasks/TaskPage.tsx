import { ArrowLeft } from "phosphor-react";
import { useParams, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "@prismane/core";
// Layouts
import SitPage from "../../../layouts/SitPage";
// Components
import SitShape from "../../../components/basic/SitShape";
import SitNavBar from "../../../components/navigation/SitNavBar";

const TaskPage = () => {
  const { id } = useParams();

  const tasks = useSelector((state: any) => state.tasks.tasks);

  const task = tasks.filter((v: any) => v._id === id)[0];

  return (
    <>
      {task ? (
        <SitPage>
          <div className="flex flex-col gap-5 w-full h-full">
            <Link
              className="flex items-center gap-2 text-base-600 hover:text-primary-500 cursor-pointer"
              to={`/app/projects/${task.projectId}`}
            >
              <ArrowLeft size={24} />
              <span className="text-inherit">Back To Project</span>
            </Link>
            <div className="flex gap-8">
              <div
                className="flex justify-center items-center w-36 aspect-square rounded-md"
                style={{ backgroundColor: task.settings.color }}
              >
                <SitShape
                  shape={task.settings.shape}
                  color="white"
                  className="w-12 h-12"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl">{task.name}</h1>
                <span>
                  Created on:{" "}
                  {new Date(task.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <SitNavBar
                links={[
                  { element: "Overview", to: "overview" },
                  { element: "Subtasks", to: "subtasks" },
                  { element: "Settings", to: "settings" },
                ]}
                layoutId="task"
              />
            </div>
            <div className="flex w-full grow">
              <Routes>
                <Route path="/" element={<Navigate to="overview" />} />
                <Route path="/overview" element={<h1>Overview</h1>} />
                <Route path="/subtasks" element={<h1>Subtasks</h1>} />
                <Route path="/settings" element={<h1>Settings</h1>} />
              </Routes>
            </div>
          </div>
        </SitPage>
      ) : (
        <>
          <Loader className="text-primary-500" />
        </>
      )}
    </>
  );
};

export default TaskPage;
