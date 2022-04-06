import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Components
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
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
    </>
  );
};

export default App;
