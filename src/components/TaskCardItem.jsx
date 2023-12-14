import React from "react";

function TaskCardItem({ task, handleEdit, handleDelete }) {
  return (
    <li>
      <p>
        <span className="name">{task.name}</span>
        <span className="time">{task.created}</span>
      </p>
      <i
        className="bi bi-pencil"
        onClick={() => {
          handleEdit(task.id);
        }}
      ></i>
      <i
        className="bi bi-trash"
        onClick={() => {
          handleDelete(task.id);
        }}
      ></i>
    </li>
  );
}

export default TaskCardItem;
