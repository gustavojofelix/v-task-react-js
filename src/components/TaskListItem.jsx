import React from "react";
import StatusIcon from "./StatusIcon";
import { format } from "date-fns";

function TaskListItem({
  task,
  handleEdit,
  handleDelete,
  handleToggleImportant,
  handleStartTask,
  handleCompleteTask,
}) {
  return (
    <li
      className="task__item__container"
      onClick={(event) => {
        handleEdit(task.id);
      }}
    >
      <p className="task__title">
        <StatusIcon
          status={task.status}
          onClick={(event) => {
            event.stopPropagation();
            //console.log("clicked");
            handleCompleteTask(task.id);
          }}
        />
        <span
          style={{
            textDecoration: task.status === "done" ? "line-through" : "none",
          }}
        >
          {task.name}
        </span>

        <i
          className={task.important ? "bi bi-star-fill" : "bi bi-star"}
          onClick={(event) => {
            event.stopPropagation();
            handleToggleImportant(task.id);
          }}
        ></i>
      </p>
      <p className="task_detail">
        <span
          className={
            task.status !== "done" && new Date() >= new Date(task.dueDate)
              ? "time overdue"
              : "time"
          }
        >
          {task.status === "pending" && (
            <button
              style={{ marginRight: "2px", border: "none", cursor: "pointer" }}
              onClick={(event) => {
                event.stopPropagation();
                handleStartTask(task.id);
              }}
            >
              Start
            </button>
          )}
          {task.status !== "done" && new Date() >= new Date(task.dueDate)
            ? "Overdue "
            : "Due "}
          {format(new Date(task.dueDate), "EEEE, MMMM d")}
        </span>
        <i
          className="bi bi-trash"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(task.id);
          }}
        ></i>
      </p>
    </li>
  );
}

export default TaskListItem;
