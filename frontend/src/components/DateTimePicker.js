import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const MyDateTimePicker = () => {
  const [dateTime, setDateTime] = useState(new Date()); // ✅ Hook inside component

  return (
    <DateTimePicker onChange={setDateTime} value={dateTime} />
  );
};

export default MyDateTimePicker;
