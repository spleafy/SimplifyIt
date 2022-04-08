import { useSelector } from "react-redux";
import { Plus } from "phosphor-react";
// Components
import Card from "../components/Card";
import Column from "../components/Column";
// Utils
import { getColors } from "../utils/utils";

const PeoplePage = () => {
  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <Column>
      <div className="flex flex-wrap gap-5">
        <Card width="200px" height="250px">
          <div className="relative w-full h-full">
            <div
              className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
              style={{
                backgroundColor: getColors(
                  loggedUser.settings.profileColor
                )[500],
              }}
            >
              <h1 className="text-white select-none">
                {loggedUser.fullname.split(" ")[0].charAt(0)}
                {loggedUser.fullname.split(" ")[1].charAt(0)}
              </h1>
            </div>
            <div className="px-3 py-1 absolute right-3 top-3 bg-slate-900/20 rounded-md text-white text-sm">
              You
            </div>
            <div className="px-5 py-3 absolute bottom-0">
              <h1 className="text-white">{loggedUser.username}</h1>
            </div>
          </div>
        </Card>
        <Card width="200px" height="250px">
          <div className="px-5 py-3 w-full h-full flex flex-col justify-center items-center cursor-pointer">
            <div className="border-dotted border-2 border-slate-700 p-3 rounded-full mb-5">
              <Plus />
            </div>
            <span>Add people</span>
          </div>
        </Card>
      </div>
    </Column>
  );
};

export default PeoplePage;
