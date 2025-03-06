import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SurveyCreation from "../pages/surveycreation"; // Ensure the correct path
import ProblemRaisorDashboard from "../pages/Problemraisordashboard/problemraisordashboard";

import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SurveyCreation from '../pages/surveycreation'  // Ensure the correct path
import ScheduleDay from '../components/Calender/calendar'
import SupervisorDashboard from '../pages/superviserdashboard'
export default function Routernav() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<SurveyCreation />} />  {/* Corrected path */}
        <Route path="/calendar" element={<ScheduleDay days={days} dates={dates} timeSlots={timeSlots} eventsByDay={eventsByDay} />} />
        <Route path="/superviserdashboard" element={< SupervisorDashboard/>} />
    </Routes>
  );
}
