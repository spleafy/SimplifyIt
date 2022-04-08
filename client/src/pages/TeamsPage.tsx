import { Plus } from "phosphor-react";
// Components
import Card from "../components/Card";

const TeamsPage = () => {
  return (
    <div className="mt-6 mx-5 flex max-w-[1400px]">
      <Card width="200px" height="250px">
        <div className="px-5 py-3 w-full h-full flex flex-col justify-center items-center cursor-pointer">
          <div className="border-dotted border-2 border-slate-700 p-3 rounded-full mb-5">
            <Plus />
          </div>
          <span>Create your first team</span>
        </div>
      </Card>
    </div>
  );
};

export default TeamsPage;
