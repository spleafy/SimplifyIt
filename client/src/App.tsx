import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Components
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
import AppActionsPanel from "./components/AppActionsPanel";
// Pages
import InitialSetupPage from "./pages/InitialPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"app"} />} />
          <Route path="initial-setup" element={<InitialSetupPage />} />
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="app/*" element={<AppRoutes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <AppActionsPanel />
    </>
  );
};

export default App;
