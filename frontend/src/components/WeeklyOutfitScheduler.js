import { useState } from "react";

const WeeklyOutfitScheduler = () => {
  const [outfits, setOutfits] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const handleChange = (day, event) => {
    setOutfits({ ...outfits, [day]: event.target.value });
  };

  return (
    <div className="weekly-scheduler">
      <h2>Plan Your Weekly Outfits</h2>
      {Object.keys(outfits).map((day) => (
        <div key={day}>
          <label>{day}</label>
          <input
            type="text"
            placeholder="Enter outfit name"
            value={outfits[day]}
            onChange={(e) => handleChange(day, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default WeeklyOutfitScheduler;
