const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cors());
server.use(cookieParser());
const registerUser = require("./handlers/registerUser");
const signinUser = require("./handlers/signinUser");
const authenticateUser = require("./middlewares/authenticateUser");
const detailsOfUser = require("./handlers/detailsOfUser");
const createTask = require("./handlers/createTask");
const getTaskById = require("./handlers/getTaskById");
const updateTaskById = require("./handlers/updateTask");
const deleteOneTask = require("./handlers/deleteTask");
const getAllUserTasks = require("./handlers/getTasksByUserId");
const getAllUsers = require("./handlers/getAllUsers");

server.post("/users/register", registerUser);
server.post("/users/signin", signinUser);
server.get("/users/getmydetails", authenticateUser, detailsOfUser);
server.post("/task/add", authenticateUser, createTask);
server.get("/task/getbyid", authenticateUser, getTaskById);
server.put("/task/update", authenticateUser, updateTaskById);
server.delete("/task/deleteone", authenticateUser, deleteOneTask);
server.get("/task/getall", authenticateUser, getAllUserTasks);
server.get("/", getAllUsers);

server.listen(3000, () =>
  console.log("Express is listening on http://localhost:3000/")
);
