import { useEffect, useState } from "react";
import { getUsers } from "../service/manageUsers";
import { usePopper } from "react-popper";
import { UserContext } from "../components/userContext";
import { useContext } from "react";

export default function AdminZone() {
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users.data));
  }, []);
  let filtered = users.filter((user) => {
    return user.isAdmin == false;
  });

  let usersRow = filtered.map((u, i) => {
    return (
      <tr key={i}>
        <td>{u._id}</td>
        <td>
          {u.name.firstName} {u.name.lastName}
        </td>
        <td>{u.email}</td>
        <td>{!u.isAdmin ? "User" : "Admin"}</td>
      </tr>
    );
  });

  return (
    <>
      <h2>All Users</h2>
      <div id="taskList">
        <table border={1} id="usersTable" className="content">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{usersRow}</tbody>
        </table>
      </div>
    </>
  );
}
