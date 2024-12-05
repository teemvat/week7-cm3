import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <Router>
      <Navbar authToken={authToken} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage authToken={authToken} />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/jobs/:id" element={<JobPage authToken={authToken} />} />
        <Route path="/edit-job/:id" element={<EditJobPage authToken={authToken} />} />
        <Route path="/add-job" element={<AddJobPage authToken={authToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
