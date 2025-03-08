import { useState } from "react";
import ScheduleCalendar from "../components/ScheduleCalendar";
import WeeklyOutfitScheduler from "../components/WeeklyOutfitScheduler"; // ✅ Ensure correct path
import "./SchedulePage.css"; // ✅ Ensure you create this CSS file

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="schedule-page">
      <h1>Wardrobe Scheduler</h1>
      <p>Selected Date: {selectedDate.toDateString()}</p> {/* ✅ Now it's used */}

      {/* ✅ Calendar Component */}
      <ScheduleCalendar setSelectedDate={setSelectedDate} />

      {/* ✅ Weekly Outfit Scheduler */}
      <WeeklyOutfitScheduler />
    </div>
  );
};

export default SchedulePage;
