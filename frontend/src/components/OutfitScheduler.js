import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css"; // ✅ Ensure styles are included
import "react-calendar/dist/Calendar.css"; // ✅ Required for calendar support
import "./OutfitScheduler.css"; // ✅ Import the new CSS file

const OutfitScheduler = () => {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <div className="scheduler">
      <h2>Pick Date & Time</h2>
      <DateTimePicker onChange={setDateTime} value={dateTime} />
      <p>Selected: {dateTime.toString()}</p>
    </div>
  );
};

export default OutfitScheduler;
