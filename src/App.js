import React, { useState } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import TaskList from "./Components/TaskList";
import NewTask from "./Components/NewTask"; // Import the NewTask component

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    // Add the new task with default "To Do" status
    setTasks([...tasks, { 
      ...newTask, 
      id: Date.now(), 
      status: "To Do",
      dueDate: newTask.dueDate || "No due date"
    }]);
    setShowNewTask(false);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowNewTask(true); // Show NewTask form after login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!loggedIn ? (
        showRegister ? (
          <Register 
            onLoginClick={() => setShowRegister(false)}
            onRegisterSuccess={handleLoginSuccess}
          />
        ) : (
          <Login 
            onRegisterClick={() => setShowRegister(true)}
            onLoginSuccess={handleLoginSuccess}
          />
        )
      ) : showNewTask ? (
        <NewTask 
          onCreateTask={handleCreateTask}
          onCancel={() => setLoggedIn(false)} // Goes back to login if canceled
        />
      ) : (
        <TaskList 
          tasks={tasks} 
          onLogout={() => setLoggedIn(false)}
          onNewTask={() => setShowNewTask(true)} // Add this prop to TaskList
        />
      )}
    </div>
  );
};

export default App;