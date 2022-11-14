import { useRef } from "react";
import { Button } from "react-bootstrap";
import { updateTask } from "../service/manageTasks";
export function PopUpEdit({ e, t, setSelectedData }) {
  const taskName = useRef();
  const endDate = useRef();
  const description = useRef();
  function onUpdate(e) {
    e.preventDefault();
    if (!confirm("are you sure you want to update?")) return null;

    const taskNameValue = taskName.current.value;
    const endDateValue = endDate.current.value;
    const descriptionValue = description.current.value;
    const updatedDetails = {
      _id: t._id,
      taskName: taskNameValue,
      endDate: endDateValue,
      description: descriptionValue,
      status: false,
    };
    if (new Date(endDateValue) < new Date()) {
      throw alert("please enter a valid end date");
    }
    if (!taskNameValue) {
      throw alert("please enter a task name");
    }
    updateTask(updatedDetails);
    setSelectedData(null);
  }
  return (
    <div className="centerContent" id="editNoMobile">
      <form
        onSubmit={(e) => {
          onUpdate(e);
        }}
      >
        <input type="text" defaultValue={t.taskName} ref={taskName} />
        <input
          type="date"
          defaultValue={t.endDate.split(".").reverse().join("-")}
          ref={endDate}
        />
        <input type="text" defaultValue={t.description} ref={description} />
        <div>
          <Button type="submit" padding="5">
            Update
            <img
              style={{ width: "22%" }}
              src="public\pencil.png"
              alt="pencil"
            ></img>
          </Button>
        </div>
      </form>
    </div>
  );
}
