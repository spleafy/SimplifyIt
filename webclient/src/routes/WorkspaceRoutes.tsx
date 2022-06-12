import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import WorkspacesOverviewPage from "../pages/workspaces/WorkspacesOverviewPage";
import NotFoundPage from "../pages/NotFoundPage";
// Components
import Column from "../components/basic/Column";
import NavigationLink from "../components/navigation/NavigationLink";
import TopNavigation from "../components/navigation/TopNavigation";

const WorkspaceRoutes: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <TopNavigation>
        <div className="flex gap-10 h-full">
          <NavigationLink to={"overview"} variant={"bordered"}>
            Overview
          </NavigationLink>
        </div>
      </TopNavigation>
      <Column>
        <Routes>
          <Route path="/" element={<Navigate to={"overview"} />} />
          <Route path="overview" element={<WorkspacesOverviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Column>
    </div>
  );
};

export default WorkspaceRoutes;
