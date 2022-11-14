
import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserContext } from "./src/components/userContext";
import { getUserDetails } from "./src/service/manageUsers";
import { getTasks } from "./src/service/manageTasks";
import { TasksContext } from "./src/components/TasksContext";
import { TasksTitleContext } from "./src/components/TasksTitleContext";
import Home from './src/pages/Home';
import About from './src/pages/About';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Contact from './src/pages/Contact';
import TaskZone from './src/pages/TaskZone';
import UserZone from './src/pages/UserZone';
import AdminZone from './src/pages/AdminZone';
import NavigationBar from "./src/components/NavigationBar";
import  Footer  from './src/components/Footer';

function App() {
  const [user, setUser] = useState();
  const userProvidor = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  const [tempTasks, setTasks] = useState([]);
  const taskProvidor = useMemo(
    () => ({
      tempTasks,
      setTasks,
    }),
    [tempTasks, setTasks]
  );

  const [listName, setListName] = useState("");
  const titleProvidor = useMemo(
    () => ({
      listName,
      setListName,
    }),
    [listName, setListName]
  );

  useEffect(() => {
    rerender();
  }, [listName, tempTasks]);
  useEffect(() => {
    getUserDetails().then((data) => setUser(data));
  }, []);

  async function rerender() {
    await getTasks().then((data) => setTasks([...data.data]));
  }

  return (
    <UserContext.Provider value={userProvidor}>
      <TasksContext.Provider value={taskProvidor}>
        <TasksTitleContext.Provider value={titleProvidor}>
          <BrowserRouter>
            <div className="App ">
              <NavigationBar />
              <div className="content container">
                <div id="imgBgcDiv">
                  <img
                    className="bgImg"
                    src=".\to-do-list.png"
                    alt="logo"
                  />
                </div>
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/lists" element={<TaskZone />} />
                  <Route path="/contacts" element={<Contact />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/adminzone" element={<AdminZone />} />
                  <Route path="/userzone" element={<UserZone />} />
                </Routes>
              </div>
<Footer    />
            </div>
          </BrowserRouter>
        </TasksTitleContext.Provider>
      </TasksContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
