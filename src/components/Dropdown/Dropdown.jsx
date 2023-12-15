import React, { useState } from "react";
import "./Dropdown.css";

const options = [
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
  { value: "in-progress", label: "In Progress" },
];

const optionsData = [
  { id: 0, title: "Pending", color: "#F7D154", selected: false, key: "status" },
  { id: 1, title: "Done", color: "#4CAF50", selected: false, key: "status" },
  {
    id: 2,
    title: "In Progress",
    color: "#4CAF50",
    selected: false,
    key: "status",
  },
  {
    id: 3,
    title: "Important",
    color: "#4CAF50",
    selected: false,
    key: "status",
  },
  { id: 4, title: "Today", color: "#4CAF50", selected: false, key: "status" },
  {
    id: 5,
    title: "Tomorrow",
    color: "#4CAF50",
    selected: false,
    key: "status",
  },
  {
    id: 6,
    title: "Next Week",
    color: "#4CAF50",
    selected: false,
    key: "status",
  },
];

function Dropdown({ list, title, multiSelect = false }) {
  const [options, setOptions] = useState(optionsData);
  const [isListOpen, setIsListOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(title);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleSelect = (option) => {
    const newOptions = [...options];
    newOptions[option.id].selected = !newOptions[option.id].selected;
    setOptions(newOptions);
    setHeaderTitle(option.title);
  };

  return (
    <div className="dd-wrapper">
      <button type="button" className="dd-header" onClick={toggleList}>
        <div className="dd-header-title">{headerTitle}</div>
        {isListOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isListOpen && (
        <div role="list" className="dd-list">
          {options.map((option) => (
            <button
              type="button"
              className="dd-list-item"
              key={option.id}
              onClick={() => {
                handleSelect(option);
              }}
            >
              {option.title}{" "}
              <span>{option.selected && <i className="bi bi-check"></i>}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
