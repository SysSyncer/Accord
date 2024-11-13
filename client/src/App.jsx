import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Register";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<LogIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Optional: Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;