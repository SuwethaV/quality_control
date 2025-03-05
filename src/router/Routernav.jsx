import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SurveyCreation from "../pages/surveycreation"; // Ensure the correct path
import ProblemRaisorDashboard from "../pages/Problemraisordashboard/problemraisordashboard";

export default function Routernav() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/survey" element={<SurveyCreation />} />{" "}
      {/* Corrected path */}
      <Route path="/Problemrd" element={<ProblemRaisorDashboard />} />
    </Routes>
  );
}
