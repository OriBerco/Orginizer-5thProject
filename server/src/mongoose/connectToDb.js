const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Oriberco:046396434Ob@cluster0.r7qa4kb.mongodb.net/TaskManager?retryWrites=true&w=majority"
  )
  .then((x) => console.log("Connected to DB"))
  .catch((x) => console.log("Failed to connect to DB"));
