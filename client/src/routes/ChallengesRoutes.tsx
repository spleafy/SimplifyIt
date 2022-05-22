import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Column from "../components/basic/Column";
import NavigationLink from "../components/navigation/NavigationLink";
import TopNavigation from "../components/navigation/TopNavigation";
// Pages
import PersonalChallengesPage from "../pages/challenges/PersonalChallengesPage";
import TeamChallengesPage from "../pages/challenges/TeamChallengesPage";
import NotFoundPage from "../pages/NotFoundPage";

const ChallengesRoutes: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Challenges / ${process.env.REACT_APP_TITLE}`;

  return (
    <div className="flex flex-col w-full h-full">
      <TopNavigation>
        <div className="flex gap-10 h-full">
          <NavigationLink variant="bordered" to="personal">
            Personal
          </NavigationLink>
          <NavigationLink variant="bordered" to="team">
            Team
          </NavigationLink>
        </div>
      </TopNavigation>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"personal"} />} />
          <Route path="personal" element={<PersonalChallengesPage />} />
          <Route path="team" element={<TeamChallengesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default ChallengesRoutes;
