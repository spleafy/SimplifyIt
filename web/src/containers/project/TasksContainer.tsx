import { useParams } from "react-router-dom";
import { Plus } from "phosphor-react";
import { useSelector } from "react-redux";
// Layout
import SitContainer from "../../layouts/SitContainer";
import { Card } from "@prismane/core";

const TasksContainer = () => {
  const { id } = useParams();

  const tasks = useSelector((state: any) => state.tasks.tasks).filter(
    (p: any) => p._id !== id
  );

  return (
    <SitContainer>
      {tasks.map((task: any, index: number) => (
        <Card
          width="300px"
          height="350px"
          className="border border-base-300 !p-0"
          key={index}
        >
          <h1></h1>
        </Card>
      ))}
      <Card
        width="350px"
        height="200px"
        className="border border-base-300 !p-0 flex flex-col !gap-2 justify-center items-center text-base-700 cursor-pointer hover:border-primary-500 hover:bg-primary-100 group transition-all"
        // onClick={() => {
        //   document.dispatchEvent(projectActionEvent);
        // }}
      >
        <Plus
          size={32}
          className="text-base-500 group-hover:text-primary-500 transition-all"
        />
        <span className="group-hover:text-primary-500 transition-all">
          Add task
        </span>
      </Card>
    </SitContainer>
  );
};

export default TasksContainer;
