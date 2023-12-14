import React, { useState } from "react";

function StatusIcon({ status, onClick }) {
  const [active, setActive] = useState(false);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  if (status === "pending") {
    return (
      <i
        className={
          active ? "bi bi-check-circle-fill active" : "bi bi-circle pending"
        }
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        onClick={onClick}
      ></i>
    );
  } else if (status === "in-progress") {
    return (
      <i
        className={
          active
            ? "bi bi-check-circle-fill active"
            : "bi bi-stopwatch-fill in-progress"
        }
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        onClick={onClick}
      ></i>
    );
  } else if (status === "done") {
    return (
      <i
        className={
          active
            ? "bi bi-check-circle-fill active"
            : "bi bi-check-circle-fill done"
        }
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        onClick={onClick}
      ></i>
    );
  }
}

export default StatusIcon;
