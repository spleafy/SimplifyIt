import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Progress } from "@prismane/core";
// Layout
import SitContainer from "../../layouts/SitContainer";
import { Card } from "@prismane/core";

const OverviewContainer = () => {
  const { id } = useParams();

  const tasks = useSelector((state: any) => state.tasks.tasks).filter(
    (t: any) => t.projectId === id
  );

  return (
    <SitContainer className="gap-10 h-fit p-0 flex-col">
      <Card
        width="400px"
        className="border border-base-300 !p-6 lex flex-col gap-5"
      >
        {/* <span className="text-xl font-bold text-base-700">Tasks Completed</span> */}
        <Progress
          variant="line"
          value={
            (tasks.filter((t: any) => t.completed === true).length /
              (tasks.length > 0 ? tasks.length : 1)) *
            100
          }
          label={
            <>
              <span className="text-lg text-base-700 font-semibold">
                Project progress
              </span>
              <span className="text-base-700 text-xl font-bold">
                {(tasks.filter((t: any) => t.completed === true).length /
                  (tasks.length > 0 ? tasks.length : 1)) *
                  100}
                %
              </span>
            </>
          }
          className="mt-4"
        />
      </Card>
    </SitContainer>
  );
};

export default OverviewContainer;
