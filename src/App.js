import Header from "./components/Header";
import TaskList from "./components/TaskList";
import "./App.css";
import { useState } from "react";
import StatusIcon from "./components/StatusIcon";
import { format, formatDistance } from "date-fns";
import TagsInput from "./components/TagsInput";

const initialTaskData = [
  {
    id: 1,
    name: "Learn React JS",
    Description: "Learn React JS",
    status: "pending",
    created: "2023-10-12T22:02",
    updated: "2023-10-12T22:02",
    dueDate: "2023-11-12T22:02",
    important: true,
    priority: "high",
    tags: ["react", "javascript"],
  },
  {
    id: 2,
    name: "Learn Node JS",
    status: "done",
    Description: "Learn Node JS",
    created: "2023-09-12T22:02",
    updated: "2023-09-12T22:02",
    dueDate: "2023-09-12T22:02",
    important: false,
    priority: "low",
    tags: ["node", "javascript"],
  },
  {
    id: 3,
    name: "Learn Mirco Service",
    status: "in-progress",
    Description: "Learn Mirco Service",
    created: "2023-11-12T22:02",
    updated: "2023-11-12T22:02",
    dueDate: "2023-11-12T22:02",
    important: false,
    priority: "medium",
    tags: ["microservice", "javascript"],
  },
];

function App() {
  const [taskList, setTaskList] = useState(initialTaskData);
  const [task, setTask] = useState({});

  const handleTaskUpdate = (e) => {
    const { value } = e.target;
    const date = new Date();
    const updatedTaskList = taskList.map((todo) =>
      todo.id === task.id
        ? {
            ...task,
            Description: value,
            updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
          }
        : todo
    );
    setTask({
      ...task,
      Description: value,
      updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
    });
    setTaskList(updatedTaskList);
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
    setTask({
      ...task,
      important: !task.important,
      updated: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
    });
    setTaskList(updatedTaskList);
  };

  function getPriorityClass(priority) {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority";
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="main">
          <div className="taskList">
            <TaskList
              taskList={taskList}
              setTaskList={setTaskList}
              task={task}
              setTask={setTask}
            />
          </div>
          <div className="taskDetails">
            <p className="task__title">
              <StatusIcon status={task.status} />
              <span>{task.name}</span>
              <i
                className={task.important ? "bi bi-star-fill" : "bi bi-star"}
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggleImportant(task.id);
                }}
              ></i>
            </p>
            <p>
              <i className="bi bi-calendar"></i>
              <span>Due: {task.dueDate} </span>
            </p>
            <p>
              <i className="bi bi-flag"></i>
              <span>
                Priority:{" "}
                <span className={getPriorityClass(task.priority)}>
                  {task.priority}
                </span>
              </span>
            </p>
            <p>
              <i className="bi bi-tag"></i>
              <span>
                <TagsInput tagList={task.tags} />
              </span>
            </p>
            <textarea
              className="description"
              name="description"
              id="description"
              placeholder="ADD NOTES"
              value={task.Description || ""}
              onChange={(e) => {
                setTask({ ...task, Description: e.target.value });
              }}
              onBlur={(e) => {
                handleTaskUpdate(e);
              }}
            >
              {task.Description}
            </textarea>

            <p className="task__details__footer">
              <i className="bi bi-box-arrow-right"></i>
              <span>
                Updated{" "}
                {task.updated &&
                  formatDistance(
                    new Date(task.updated) || new Date(),
                    new Date(),
                    {
                      includeSeconds: true,
                      addSuffix: true,
                    }
                  )}
              </span>
              <i className="bi bi-trash"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
