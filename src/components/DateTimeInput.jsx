import { addDays, format } from "date-fns";
import React, { useState, useEffect } from "react";

import "./DateTimeInput.css";

function DateTimeInput({ value, onChange }) {
  const [formattedDateValue, setFormattedDateValue] = useState("");
  const [formattedTimeValue, setFormattedTimeValue] = useState("");

  useEffect(() => {
    if (value != null && formattedDateValue === "") {
      setFormattedDateValue(format(new Date(value), "yyyy-MM-dd"));
    }
    if (value == null || value === "") {
      setFormattedDateValue(format(new Date(), "yyyy-MM-dd"));
    }

    if (value != null && formattedTimeValue === "") {
      setFormattedTimeValue(format(new Date(value), "HH:mm"));
    }
    if (value == null || value === "") {
      setFormattedTimeValue(format(new Date(), "HH:mm"));
    }
  }, [value, formattedDateValue, formattedTimeValue]);

  return (
    <div>
      <div className="datetimepicker">
        <input
          type="date"
          id="date"
          value={formattedDateValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormattedDateValue(newValue);

            const currentValue = new Date(newValue);
            if (onChange != null) {
              onChange(format(currentValue, "yyyy-MM-dd'T'HH:mm:ss"));
            }
          }}
        />
        <span></span>
        <input
          type="time"
          id="time"
          value={formattedTimeValue}
          onChange={(e) => {
            const newValue = e.currentTarget.value;
            setFormattedTimeValue(newValue);

            // const currentValue = new Date(newValue);
            if (onChange != null) {
              onChange(formattedTimeValue);
            }
          }}
        />
        <button
          className="today"
          onClick={(e) => {
            e.preventDefault();
            setFormattedDateValue(format(new Date(), "yyyy-MM-dd"));
            setFormattedTimeValue(format(new Date(), "HH:mm"));
            if (onChange != null) {
              onChange(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"));
            }
          }}
        >
          Today
        </button>
        <button
          className="tomorrow"
          onClick={(e) => {
            e.preventDefault();
            setFormattedDateValue(format(addDays(new Date(), 1), "yyyy-MM-dd"));
            setFormattedTimeValue(format(new Date(), "HH:mm"));
            if (onChange != null) {
              onChange(format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss"));
            }
          }}
        >
          Tomorrow
        </button>
        <button
          className="nextweek"
          onClick={(e) => {
            e.preventDefault();
            setFormattedDateValue(format(addDays(new Date(), 7), "yyyy-MM-dd"));
            setFormattedTimeValue(format(new Date(), "HH:mm"));
            if (onChange != null) {
              onChange(format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm:ss"));
            }
          }}
        >
          Next Week
        </button>
      </div>
    </div>
  );
}

export default DateTimeInput;
