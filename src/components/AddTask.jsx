import { format } from "date-fns";
import React, { useState } from "react";
import DateTimeInput from "./DateTimeInput";

function AddTask({ taskList, setTaskList, task, setTask }) {
  const [selectedDateTime, setSelectedDateTime] = useState(task.created);

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
    setTask({ ...task, created: selectedDateTime });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.id) {
      const date = new Date();
      const updatedTaskList = taskList.map((todo) =>
        todo.id === task.id
          ? {
              ...task,
              name: e.target.task.value,
              updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
              dueDate: e.target.date.value,
            }
          : todo
      );

      setTaskList(updatedTaskList);
    } else {
      const date = new Date();
      const newTask = {
        id: date.getTime(),
        name: e.target.task.value,
        status: "pending",
        updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        created: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        dueDate: e.target.date.value,
        important: false,
      };
      setTaskList([...taskList, newTask]);
    }
    setTask({});
  };
  return (
    <section className="add__task__container">
      <form onSubmit={handleSubmit}>
        <div className="task__title">
          <i className="bi bi-circle"></i>
          <input
            type="text"
            name="task"
            autoComplete="off"
            placeholder="Add Task"
            maxLength={25}
            value={task.name || ""}
            onChange={(e) => {
              setTask({ ...task, name: e.target.value });
            }}
          />
        </div>
        <div className="form__footer">
          {/* <input
            type="datetime-local"
            name="date"
            onChange={(e) => {
              setTask({ ...task, created: e.target.value });
            }}
            value={task.created || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")}
          /> */}
          <DateTimeInput
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          />

          <button type="submit">{task.id ? "Update" : "Add"}</button>
        </div>
      </form>
    </section>
  );
}

export default AddTask;
