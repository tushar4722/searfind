import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobsPage from "./pages/jobs/JobsPage";
import PostJobPage from "./pages/jobs/PostJobPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import MyJobsPage from "./pages/jobs/MyJobsPage";
import MyApplicationsPage from "./pages/jobs/MyApplicationsPage";

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
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/jobs/post" element={
          <PrivateRoute><PostJobPage /></PrivateRoute>
        } />
        <Route path="/my-jobs" element={
          <PrivateRoute><MyJobsPage /></PrivateRoute>
        } />
        <Route path="/my-applications" element={
          <PrivateRoute><MyApplicationsPage /></PrivateRoute>
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