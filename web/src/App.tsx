import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { themes as T } from "@prismane/core";
// Routes
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
// Pages
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  console.log(`
       .-.
      (0.0)
    '=.|m|.='
    .=''"''=.
   `);

  const theme = T.createTheme({
    colors: {
      primary: T.colors["sky"],
    },
  });

  T.applyTheme(theme);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route
          path="*"
          element={<NotFoundPage to="auth" name="Login Page" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
