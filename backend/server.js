const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete DevOps Lab"
  },
  {
    id: 2,
    title: "Prepare Viva"
  }
];

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title
  };

  tasks.push(newTask);

  res.json({
    message: "Task Added Successfully",
    task: newTask
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});