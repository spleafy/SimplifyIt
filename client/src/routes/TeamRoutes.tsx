import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import TeamsPage from "../pages/teams/TeamsPage";
import TeamOverviewPage from "../pages/teams/TeamOverviewPage";
import JoinTeamPage from "../pages/teams/JoinTeamPage";
import NotFoundPage from "../pages/NotFoundPage";
// Components
import Column from "../components/basic/Column";
// Utils
import { updateUserTeams } from "../utils/user";

const TeamRoutes: FC = () => {
  useEffect(() => {
    const effect = async () => {
      await updateUserTeams();
    };

    effect();
  });

  return (
    <div className="flex flex-col w-full">
      <Column>
        <Routes>
          <Route path="/" element={<TeamsPage />} />
          <Route path="/:id" element={<TeamOverviewPage />} />
          <Route path="join" element={<JoinTeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default TeamRoutes;
