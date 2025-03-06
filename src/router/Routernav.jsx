import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SurveyCreation from '../pages/surveycreation'  // Ensure the correct path
import ScheduleDay from '../components/Calender/calendar'
import SupervisorDashboard from '../pages/superviserdashboard'
export default function Routernav() {

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [21, 22, 23, 24, 25, 26, 27];

  const timeSlots = [
    { time: '8 am' },
    { time: '9 am' },
    { time: '10 am' },
    { time: '11 am' },
    { time: '12 pm' },
    { time: '01 pm' },
    { time: '02 pm' },
    { time: '03 pm' },
    { time: '04 pm' },
    { time: '05 pm' },
  ];


  const eventsByDay = {
    0: [
      { timeSlot: 0, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 3, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
      { timeSlot: 6, type: 'Discussion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
    ],
    1: [
      { timeSlot: 1, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 4, type: 'Exam', color: 'text-purple-500 border-purple-500 bg-purple-50', hasPlayButton: true },
      { timeSlot: 7, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
    ],
    2: [
      { timeSlot: 2, type: 'Discussion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
      { timeSlot: 2, type: 'Discuwdssion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
      { timeSlot: 5, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 8, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
    ],
    3: [
      { timeSlot: 0, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 2, type: 'Exam', color: 'text-purple-500 border-purple-500 bg-purple-50', hasPlayButton: true },
      { timeSlot: 4, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
      { timeSlot: 6, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
      { timeSlot: 7, type: 'Discussion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
      { timeSlot: 8, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
    ],
    4: [
      { timeSlot: 1, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
      { timeSlot: 3, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 5, type: 'Discussion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
    ],
    5: [
      { timeSlot: 0, type: 'Discussion', color: 'text-purple-500 border-purple-500 bg-purple-50' },
      { timeSlot: 2, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
      { timeSlot: 6, type: 'Exam', color: 'text-purple-500 border-purple-500 bg-purple-50', hasPlayButton: true },
    ],
    6: [
      { timeSlot: 1, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 4, type: 'Personal', color: 'text-blue-500 border-blue-500 bg-blue-50' },
      { timeSlot: 7, type: 'Project', color: 'text-amber-500 border-amber-500 bg-amber-50' },
    ],
  };    
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<SurveyCreation />} />  {/* Corrected path */}
        <Route path="/calendar" element={<ScheduleDay days={days} dates={dates} timeSlots={timeSlots} eventsByDay={eventsByDay} />} />
        <Route path="/superviserdashboard" element={< SupervisorDashboard/>} />
    </Routes>
)
}
