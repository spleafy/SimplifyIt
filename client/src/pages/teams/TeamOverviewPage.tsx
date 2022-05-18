import { FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import ProfilePicture from "../../components/basic/ProfilePicture";

const TeamOverviewPage: FC = () => {
  const { id } = useParams();

  const teams = useSelector((state: any) => state.teams.teams);

  const team = teams.find((e: any) => {
    return e._id === id;
  });

  return (
    <div className="flex flex-col w-full">
      <div className={`w-[100px]`}>
        <ProfilePicture
          color={team ? team.settings.teamColor : "slate"}
          name={team ? team.name : "undefined da"}
          size="xl"
        />
      </div>
      <h1 className="mt-3">{team ? team.name : ""}</h1>
      <h3 className="text-lg text-slate-600 dark:text-slate-300">
        Users: {team ? team.users.length : ""}
      </h3>
    </div>
  );
};

export default TeamOverviewPage;
