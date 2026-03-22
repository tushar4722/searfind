import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FreelancersPage from "./pages/freelancers/FreelancersPage";
import FreelancerDetailPage from "./pages/freelancers/FreelancerDetailPage";
import BecomeFreelancerPage from "./pages/freelancers/BecomeFreelancerPage";
import MyFreelancerPage from "./pages/freelancers/MyFreelancerPage";
import UserProfile from "./pages/profile/UserProfile";
import EditProfile from "./pages/profile/EditProfile";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("searfind_token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/freelancers" />} />
        <Route path="/freelancers" element={<FreelancersPage />} />
        <Route path="/freelancers/:id" element={<FreelancerDetailPage />} />
        <Route path="/become-freelancer" element={
          <PrivateRoute><BecomeFreelancerPage /></PrivateRoute>
        } />
        <Route path="/my-freelancer-profile" element={
          <PrivateRoute><MyFreelancerPage /></PrivateRoute>
        } />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile/edit" element={
          <PrivateRoute><EditProfile /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;