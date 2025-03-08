import React, { useState } from "react"; // ✅ Ensure React is imported
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ScheduleCalendar.css";

const ScheduleCalendar = ({ setSelectedDate }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  return (
    <div className="calendar-container">
      <h2>Schedule Your Outfit</h2>
      <Calendar onChange={handleDateChange} value={date} />
      <p>Selected Date: {date.toDateString()}</p>
    </div>
  );
};

export default ScheduleCalendar;
