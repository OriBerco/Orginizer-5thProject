import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
import { TasksTitleContext } from "./TasksTitleContext";
import { UserContext } from "./userContext";
import { Button } from "react-bootstrap";

export function UserLists({ toggleBox2 }) {
  const { setListName } = useContext(TasksTitleContext);
  const { tempTasks } = useContext(TasksContext);
  const [tempTitle, setTempTitle] = useState();
  const { user } = useContext(UserContext);

  const titleFilter = tempTasks.map((task) => {
    return task.title;
  });

  const titleArr = [...new Set(titleFilter)].map((task, i) => {
    return (
      <><div
        className="listTitle"
        key={i}
        onClick={() => {
          setListName(task);
        }}
      >
        {task} 
      </div>|</>
    );
  });
  const displaytitles = () => {
    if (!user) {
      return (
        <>
          <br />
        </>
      );
    }
    if (tempTasks < 1) {
      return (
        <>
          <Button onClick={() => toggleBox2()}>New List</Button>
          <hr />
          <div> No Lists </div>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => toggleBox2()}>New List</Button>
          <br />
          <div id="allTasksBar">|{titleArr}</div>
        </>
      );
    }
  };

  return (
    <>
      <h1>My Lists</h1>
      <br />
      {displaytitles()}
    </>
  );
}
