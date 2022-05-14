import { FC } from "react";
import { Plus } from "phosphor-react";
// Components
import Card from "../components/basic/Card";
import Column from "../components/basic/Column";

const TeamsPage: FC = () => {
  return (
    <Column>
      <Card width="200px" height="250px">
        <div className="px-5 py-3 w-full h-full flex flex-col justify-center items-center cursor-pointer">
          <div className="border-dotted border-2 border-slate-700 p-3 rounded-full mb-5">
            <Plus />
          </div>
          <span>Create your first team</span>
        </div>
      </Card>
    </Column>
  );
};

export default TeamsPage;
