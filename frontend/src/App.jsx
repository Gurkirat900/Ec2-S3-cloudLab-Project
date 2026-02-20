import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth setToken={setToken} />} />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard setToken={setToken} /> : <Navigate to="/auth" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
