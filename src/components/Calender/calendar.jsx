import React, { useState, useEffect } from 'react';
import { CircleIcon, PlayCircleIcon, GripIcon, Circle, Pause, Play, Flag } from 'lucide-react';

const ScheduleDay = ({ days, dates, timeSlots, eventsByDay }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeString, setCurrentTimeString] = useState('');
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [showTimeLine, setShowTimeLine] = useState(true);
  const [events, setEvents] = useState(eventsByDay);
  const [draggedCategory, setDraggedCategory] = useState(null);
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    let interval;
    if (pause) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pause]);

  const handlePlay = () => {
    setPause(true);
  };

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  const updateCurrentTime = () => {
    const now = new Date();
    setCurrentTime(now);

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12;
    const timeString = `${formattedHours}:${minutes.toString().padStart(2, '0')}${isPM ? ' pm' : ' am'}`;
    setCurrentTimeString(timeString);
    const startHour = 8;
    const endHour = 16;
    const currentHourDecimal = hours + minutes / 60;

    if (currentHourDecimal >= startHour && currentHourDecimal <= endHour) {
      const slotHeight = 64;
      const hoursSinceStart = currentHourDecimal - startHour;
      const pixelPosition = (hoursSinceStart / 1) * slotHeight;
      setCurrentTimePosition(pixelPosition);
      setShowTimeLine(true);
    } else {
      setShowTimeLine(false);
    }
  };

  useEffect(() => {
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e, category) => {
    e.dataTransfer.setData('text', category);
    setDraggedCategory(category);
    if (e.target.style) {
      e.target.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e) => {
    if (e.target.style) {
      e.target.style.opacity = '1';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f3f4f6';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.backgroundColor = '';

    const category = e.dataTransfer.getData('text') || draggedCategory;

    if (!category) {
      console.error("No category data found in drop event");
      return;
    }

    console.log(`Dropped Category: ${category}`);
  };

  const categories = ["Personal", "Discussion", "Project"];

  return (
    <div className="w-full mx-auto p-6 font-sans h-full overflow-y-auto">
      <div className="grid grid-cols-7 mb-2 text-center text-gray-500">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-sm cursor-pointer"
            onClick={() => handleDayClick(index)}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mb-6 text-center">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`text-lg font-medium cursor-pointer ${index === selectedDay ? 'bg-purple-600 text-white rounded-lg p-2' : ''}`}
            onClick={() => handleDayClick(index)}
          >
            {date}
          </div>
        ))}
      </div>

      <div className="text-gray-700 mb-4">Fix your flexible time for logs</div>

      <div className="flex mb-8 gap-5 w-full">
        {categories.map((category, index) => (
          <button
            key={index}
            className="bg-gray-100 py-2 border w-full rounded-md flex items-center space-x-2 cursor-move"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, category)}
            onDragEnd={handleDragEnd}
          >
            <Circle className="h-3 w-3 text-gray-400 bg-gray-400 rounded-full" />
            <span className="text-gray-500">{category}</span>
            <GripIcon className="h-4 w-4 text-gray-400 ml-2" />
          </button>
        ))}
      </div>

      <div className="relative w-full">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="relative mb-10 w-full cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="absolute left-0 top-0 w-12 text-sm text-gray-500">
              {slot.time}
            </div>
            <div className="ml-16 border-t border-dashed border-gray-300 h-12 -mt-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDay;
