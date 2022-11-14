import { PopUpEdit } from "./PopUpEdit";
import { completeTask, deleteTask } from "../service/manageTasks.js";
import { UserContext } from "./userContext.jsx";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";

export default function OverdueTasks() {
  const { setListName } = useContext(TasksTitleContext);
  const [selectedData, setSelectedData] = useState();
  TasksTitleContext;
  const { tempTasks, setTasks } = useContext(TasksContext);
  let filtered = tempTasks.filter(
    (task) => new Date(task.endDate) > new Date() && task.status == false
  );
  const completeTaskHandle = (task) => {
    if (!confirm("are you sure you want to complete task?")) return null;
    completeTask(task);
    setSelectedData(null);
  };

  const deleteTaskHandle = (task) => {
    if (!confirm("are you sure you want to delete task?")) return null;
    deleteTask(task);
    setSelectedData(null);
    setTasks(tempTasks);
  };
  function taskPopUp(task, event) {
    if (task) {
      setSelectedData(
        <div
          id="editPopUp"
          style={{
            top: event.clientY - 150,
            left: event.clientX - 200,
          }}
        >
          <div>
            <div
              className="x"
              onClick={() => {
                setSelectedData(null);
              }}
            >
              X
            </div>
            <PopUpEdit setSelectedData={setSelectedData} t={task} e={event} />
            <br />
          </div>
          <div className="centerContent" style={{ flexDirection: "row" }}>
            <div></div>
            <div
              onClick={() => {
                deleteTaskHandle(task._id);
              }}
            >
              Delete
              <img src=".\delete.png" alt="garbage" />
            </div>
            <div
              onClick={() => {
                completeTaskHandle(task);
              }}
            >
              Complete
              <img src=".\checklist.png" alt="check" />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  let taskRows = filtered
    .sort((a, b) => {
      return a.endDate < b.endDate ? -1 : 1;
    })
    .map((task, i) => {
      return (
        <tr
          key={i}
          className={task.status == true ? "Completed" : "Uncompleted"}
          onClick={(event) => {
            setSelectedData(null);
            taskPopUp(task, event);
          }}
        >
          <td>{task.title}</td>
          <td>{task.taskName}</td>
          <td>{task.endDate.split("-").reverse().join("/")}</td>
        </tr>
      );
    });

  if (filtered.length < 1) {
    return (
      <>
        <h3>Active Tasks ({filtered.length})</h3> <p>None</p>
      </>
    );
  }
  return (
    <div className="centerContent">
      <h3>Active Tasks ({filtered.length})</h3>
      {selectedData}
      <div id="homeList">
        <table>
          <thead>
            <tr>
              <th>List</th>
              <th>Task</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody id="homeTask">{taskRows}</tbody>
        </table>
      </div>{" "}
      <div>
        <Link to="/lists">
          <Button onClick={() => setListName("")}>All Tasks</Button>
        </Link>
      </div>
    </div>
  );
}
