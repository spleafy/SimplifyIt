import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Components
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
import ErrorPanel from "./components/ErrorPanel";
// Pages
import InitialSetupPage from "./pages/InitialPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
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
      <ErrorPanel />
    </>
  );
};

export default App;
