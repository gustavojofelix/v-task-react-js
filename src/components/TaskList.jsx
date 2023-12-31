import React, { useEffect } from "react";
import { format } from "date-fns";

import AddTask from "./AddTask";
import TaskCardItem from "./TaskCardItem";
import TaskListItem from "./TaskListItem";
import Dropdown from "./Dropdown/Dropdown";

function TaskList({ taskList, setTaskList, task, setTask }) {
  const [viewType, setViewType] = React.useState("list");
  const [searchText, setSearchText] = React.useState("");
  const [filteredTaskList, setFilteredTaskList] = React.useState(taskList);

  useEffect(() => {
    if (searchText === "") {
      setFilteredTaskList(taskList);
    } else {
      const newFilteredTaskList = taskList.filter((task) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTaskList(newFilteredTaskList);
    }
  }, [searchText, taskList]);

  useEffect(() => {
    setFilteredTaskList(taskList);
  }, [taskList]);

  const searchTask = (searchValue) => {
    setSearchText(searchValue);
  };

  function compare(a, b) {
    const importatA = a.important;
    const importatB = b.important;

    let comparison = 0;
    if (importatA < importatB) {
      comparison = 1;
    } else if (importatA > importatB) {
      comparison = -1;
    }
    return comparison;
  }

  const handleDelete = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
    setTask({});
  };
  const handleEdit = (id) => {
    const selectedTask = taskList.find((task) => task.id === id);
    setTask(selectedTask);
  };

  const handleToggleImportant = (id) => {
    const date = new Date();
    const updatedTaskList = taskList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            important: !todo.important,
            updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
          }
        : todo
    );
    console.log(id);
    setTaskList(updatedTaskList);
  };

  const handleStartTask = (id) => {
    const date = new Date();
    const updatedTaskList = taskList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: "in-progress",
            updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
          }
        : todo
    );
    console.log(id);
    setTaskList(updatedTaskList);
  };

  const handleCompleteTask = (id) => {
    const date = new Date();
    const updatedTaskList = taskList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "done" ? "pending" : "done",
            updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
          }
        : todo
    );
    console.log(id);
    setTaskList(updatedTaskList);
  };

  return (
    <section className="show__task">
      <div className="head">
        <span>
          <span className="title">My Tasks</span>
          <span className="count">{taskList.length}</span>
        </span>
        <input
          type="text"
          className="search"
          placeholder="Search for task by title or tag"
          onChange={(e) => {
            searchTask(e.target.value);
          }}
        />
        <div className="filter">
          {/* <i className="bi bi-filter"></i> */}
          <Dropdown title="Select Filters" />
        </div>
      </div>
      <div className="head__footer">
        <span className="time">{format(new Date(), "EEEE, MMMM d")}</span>
      </div>
      <AddTask
        taskList={taskList}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
      />

      <div className="task__view__container">
        <div className="task__view__header">
          <i
            onClick={() => {
              setViewType("card");
            }}
            className="bi bi-grid"
          ></i>
          <i
            onClick={() => {
              setViewType("list");
            }}
            className="bi bi-list"
          ></i>
        </div>
        <div className="task__view__body">
          {viewType === "list" ? (
            <div className="task__list__view">
              <ul>
                {filteredTaskList.sort(compare).map((task) => {
                  return (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleToggleImportant={handleToggleImportant}
                      handleStartTask={handleStartTask}
                      handleCompleteTask={handleCompleteTask}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="task__card__view">
              <ul>
                {filteredTaskList.sort(compare).map((task) => {
                  return (
                    <TaskCardItem
                      key={task.id}
                      task={task}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TaskList;
