import { PopUpEdit } from "./PopUpEdit";
import { completeTask, deleteTask } from "../service/manageTasks.js";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";
import { deleteAllCompleted } from "./../service/manageTasks";

export default function CompletedTasks() {
  const [selectedData, setSelectedData] = useState();
  TasksTitleContext;
  const { tempTasks, setTasks } = useContext(TasksContext);
  let filtered = tempTasks.filter((task) => task.status == true);
  const completeTaskHandle = (task) => {
    if (!confirm("are you sure you want to complete task?")) return null;
    completeTask(task);
    setSelectedData(null);
  };

  function deleteTasks(filtered) {
    if (!confirm("Are you sure you want to clear tasks?")) {
      return null;
    }
    deleteAllCompleted(filtered);
  }

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

  let taskRows = filtered.map((task, i) => {
    return (
      <tr
        key={i}
        className="Completed"
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
        <h3>Completed Tasks ({filtered.length})</h3>
        <p>None</p>
      </>
    );
  }
  return (
    <div className="centerContent">
      <h3>Completed Tasks ({filtered.length})</h3>
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
        <Button onClick={() => deleteTasks(filtered)}>Clear</Button>
      </div>
    </div>
  );
}
