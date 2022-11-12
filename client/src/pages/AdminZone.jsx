import { useEffect, useState } from "react";
import { getUsers } from "../service/manageUsers";
import { usePopper } from "react-popper";
import { UserContext } from "../components/userContext";
import { useContext } from "react";

export default function AdminZone() {
  const [changeVis, setChangeVis] = useState("hidden");
  const [plus, setPlus] = useState("+");
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  function changeVisOnClick() {
    if (changeVis == "hidden" && plus == "+") {
      setChangeVis("visible");
      setPlus("-");
    } else {
      setChangeVis("hidden");
      setPlus("+");
    }
  }
  useEffect(() => {
    getUsers().then((users) => setUsers(users.data));
  }, [user]);

  let usersRow = users.map((u, i) => {
    return (
      <tr key={i}>
        <td>{u._id}</td>
        <td>
          {u.name.firstName} {u.name.lastName}
        </td>
        <td>{u.email}</td>
        <td>{!u.isAdmin ? "User" : "Admin"}</td>

        <td>
          <button>Delete</button>
          <button>Edit</button>
        </td>
      </tr>
    );
  });

  if (user.isAdmin == true)
    return (
      <div id="usersBox">
        <h2>All Users</h2>
        <table border={1} id="usersTable" className="content">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>
                <button
                  onClick={() => changeVisOnClick()}
                  style={{ width: "100%" }}
                >
                  {plus}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{usersRow}</tbody>
        </table>
      </div>
    );
}
