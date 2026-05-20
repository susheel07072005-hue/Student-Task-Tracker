import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });

  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask,
      }),
    });

    const data = await response.json();

    setTasks([...tasks, data.task]);
    setNewTask("");
  };

  return (
    <div className="app">

      <nav className="navbar">
        <h1>Student Task Tracker</h1>
        <p>DevOps Project Dashboard</p>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h2>Track Your Academic Tasks Efficiently</h2>
          <p>
            Manage assignments, viva preparation, lab records,
            and DevOps workflow tasks in one place.
          </p>

          <div className="stats">
            <div className="stat-card">
              <h3>{tasks.length}</h3>
              <p>Total Tasks</p>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <p>Availability</p>
            </div>

            <div className="stat-card">
              <h3>CI/CD</h3>
              <p>Integrated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="task-section">

        <div className="task-input-card">
          <h2>Add New Task</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />

            <button onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>

        <div className="task-list-card">
          <h2>Pending Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <div>
                  <h3>{task.title}</h3>
                  <p>Task ID: #{task.id}</p>
                </div>

                <span className="badge">
                  Active
                </span>
              </div>
            ))
          )}
        </div>

      </div>

      <footer className="footer">
        <p>
          Built using React, Node.js, Express, Docker, Jenkins & DevOps Pipeline
        </p>
      </footer>

    </div>
  );
}

export default App;