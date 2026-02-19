import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}

export default App;
