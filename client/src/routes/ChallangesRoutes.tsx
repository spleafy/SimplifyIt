import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Column from "../components/Column";
import NavigationLink from "../components/NavigationLink";
import TopNavigation from "../components/TopNavigation";
// Pages
import PersonalChallangesPage from "../pages/challanges/PersonalChallangesPage";
import TeamChallangesPage from "../pages/challanges/TeamChallangesPage";
import NotFoundPage from "../pages/NotFoundPage";

const ChallangesRoutes = () => {
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
          <Route path="personal" element={<PersonalChallangesPage />} />
          <Route path="team" element={<TeamChallangesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default ChallangesRoutes;