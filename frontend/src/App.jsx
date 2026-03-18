import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobsPage from "./pages/jobs/JobsPage";
import PostJobPage from "./pages/jobs/PostJobPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("searfind_token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/post" element={
          <PrivateRoute><PostJobPage /></PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div className="p-8 text-2xl font-bold text-indigo-600">
              Welcome to SearFind Dashboard! 🚀
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
