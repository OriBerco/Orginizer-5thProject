import { PopUpEdit } from "./PopUpEdit";
import { completeTask, deleteTask } from "../service/manageTasks.js";
import { UserContext } from "./userContext.jsx";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TasksTitleContext } from "./TasksTitleContext";
import { TasksContext } from "./TasksContext";

export default function TasksList({ toggleBox }) {
  const [show, setShow] = useState();
  const [selectedData, setSelectedData] = useState();
  const { user } = useContext(UserContext);
  const { listName, setListName } = useContext(TasksTitleContext);
  const { tempTasks, setTasks } = useContext(TasksContext);
  let filtered = tempTasks.filter((task) => task.title == listName);
  const completeTaskHandle = (task) => {
     if (!confirm("are you sure you want to complete task?")) return null;
    completeTask(task);
    setSelectedData(null);
  };

  const deleteTaskHandle = (task) => {
    if(!confirm("are you sure you want to delete task?")) return null;
    deleteTask(task);
    setSelectedData(null);
    setTasks(tempTasks);

    if (filtered.length <= 1) {
      setListName("");
    }
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
                setShow(null);
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
            >delete 
              <img src="public\delete.png" alt="garbage" />
            </div>
            <div
              onClick={() => {
                completeTaskHandle(task);
              }}
            >complete
              <img src="public\checklist.png" alt="check" />
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
        className={task.status == true ? "Completed" : "Uncompleted"}
        onClick={(event) => {
          setSelectedData(null);
          taskPopUp(task, event);
        }}
      >
        <td>{i + 1 + "."}</td>
        <td>{task.taskName}</td>
        <td>{task.endDate}</td>
        <td>{task.description}</td>
        <td>{task.status == true ? "Completed" : "Uncompleted"}</td>
      </tr>
    );
  });
  if (!user) {
    return (
      <div>
        <h3>Log in to see lists</h3>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <br />
        <br />

        <p> Dont have an account yet?</p>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }
  if (listName.length < 1) {
    return <div>Choose a list or make a new one</div>;
  }
  return (
    <>
      <div id="taskListBox">
        <h3>{listName}</h3>
        <Button onClick={() => toggleBox("Add")}>Add Task</Button>
        {selectedData}
        <div id="taskList">
          <table>
            <thead style={{ fontSize: "2.5rem" }}>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="task">{taskRows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
