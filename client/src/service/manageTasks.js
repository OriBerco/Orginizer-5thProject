const url = "http://localhost:3000/";
import axios from "axios";
import Cookies from "js-cookie";

const token = { headers: { Authorization: Cookies.get("jid") } };

export async function getTasks() {
  if (token)
    return await axios
      .get(url + "task/getall", {
        headers: { Authorization: Cookies.get("jid") },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => console.log(error.response.message));
}
export function completeTask(task) {
  task.status = true;
  axios.put(url + "task/update", task, {
    headers: { Authorization: Cookies.get("jid") },
  });
}
export function createNewTask(task) {
  if (task.taskName.length > 0) {
    if (task.description == "") {
      task.description = "no description";
      axios
        .post(url + "task/add", task, {
          headers: { Authorization: Cookies.get("jid") },
        })
        .catch((error) => console.log(error.response.data));
    } else {
      axios
        .post(url + "task/add", task, {
          headers: { Authorization: Cookies.get("jid") },
        })
        .catch((error) => console.log(error.response.data));
    }
  }
}
export function updateTask(task) {
  axios.put(url + "task/update", task, {
    headers: { Authorization: Cookies.get("jid") },
  });
}

export function deleteTask(id) {
  axios
    .delete(url + "task/deleteone/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { id: id },
    })
    .catch((error) => console.log(error));
}
export function deleteAllCompleted() {
  axios
    .delete(url + "task/deleteall/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { status: true },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}
export function deleteAllOverdue() {
  axios
    .delete(url + "task/deleteall/", {
      headers: { Authorization: Cookies.get("jid") },
      data: { endDate: { $lt: new Date() } },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}
