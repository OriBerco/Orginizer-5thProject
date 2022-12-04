import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserContext } from "./src/components/userContext";
import { getUserDetails } from "./src/service/manageUsers";
import { getTasks } from "./src/service/manageTasks";
import { TasksContext } from "./src/components/TasksContext";
import { TasksTitleContext } from "./src/components/TasksTitleContext";
import { ToRenderContext } from "./src/components/ToRenderContext";
import Home from "./src/pages/Home";
import About from "./src/pages/About";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Contact from "./src/pages/Contact";
import TaskZone from "./src/pages/TaskZone";
import UserZone from "./src/pages/UserZone";
import AdminZone from "./src/pages/AdminZone";
import NavigationBar from "./src/components/NavigationBar";
import Footer from "./src/components/Footer";
import PageNotFound from "./src/pages/PageNotFound";

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
  const [toRender, setToRender] = useState(1);
  const toRenderProvidor = useMemo(
    () => ({
      toRender,
      setToRender,
    }),
    [toRender, setToRender]
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
  }, [listName]);
  useEffect(() => {
    
    getUserDetails().then((data) => setUser(data));
  }, []);

  async function rerender() {
   
    await getTasks().then((data) => !data? null : setTasks(data.data));
  }

  return (
    <ToRenderContext.Provider value={toRenderProvidor}>
      <UserContext.Provider value={userProvidor}>
        <TasksContext.Provider value={taskProvidor}>
          <TasksTitleContext.Provider value={titleProvidor}>
            <BrowserRouter>
              <div className="App ">
                <NavigationBar />
                <div className="content container">
                  <div id="imgBgcDiv">
                    <img className="bgImg" src="/to-do-list.png" alt="logo" />
                  </div>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/lists" element={<TaskZone />} />
                    <Route exact path="/contacts" element={<Contact />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/adminzone" element={<AdminZone />} />
                    <Route exact path="/userzone" element={<UserZone />} />
                    <Route exact path="*" element={<PageNotFound />} />
                  </Routes>
                </div>
                <Footer />
              </div>
              <br />
              <br />
              <br />
            </BrowserRouter>
          </TasksTitleContext.Provider>
        </TasksContext.Provider>
      </UserContext.Provider>
    </ToRenderContext.Provider>
  );
}

export default App;
