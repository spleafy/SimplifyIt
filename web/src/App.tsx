import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { themes as T } from "@prismane/core";
import { Provider } from "react-redux";
// Routes
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
// Pages
import NotFoundPage from "./pages/NotFoundPage";
// Redux
import store from "./redux/store";

const App = () => {
  console.log(`
       .-.
      (0.0)
    '=.|m|.='
    .=''"''=.
   `);

  const theme = T.createTheme({
    colors: {
      primary: T.colors["indigo"],
    },
  });

  T.applyTheme(theme);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"app"} />} />
          <Route path="app/*" element={<AppRoutes />} />
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route
            path="*"
            element={<NotFoundPage to="auth" name="Login Page" />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
