// File: App.js (Updated)
import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import TaskList from "./Components/TaskList";
import NewTask from "./Components/NewTask";

// Mock data for demonstration - replace with actual API calls
const mockUsers = [
    { id: 1, name: "Masibuve", email: "masibuve@example.com", role: "Developer" },
    { id: 2, name: "Phihlello", email: "phihlello@example.com", role: "Manager" }
];

const mockNotifications = [
    {
        id: 1,
        title: "Task Deadline Approaching",
        message: "The task 'Finalize project scope' is due tomorrow",
        priority: "High",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
    },
    {
        id: 2,
        title: "New Task Assigned",
        message: "You have been assigned to 'Develop wireframes'",
        priority: "Medium",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: true
    }
];

const App = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentView, setCurrentView] = useState("dashboard");
    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [notifications, setNotifications] = useState(mockNotifications);

    useEffect(() => {
        // Load tasks from localStorage or API
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }

        // Load notifications from localStorage or API
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        }
    }, []);

    useEffect(() => {
        // Save tasks to localStorage whenever they change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        // Save notifications to localStorage whenever they change
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const handleCreateTask = (newTask) => {
        const task = {
            ...newTask,
            id: Date.now(),
            status: "To Do",
            dueDate: newTask.dueDate || "No due date",
            createdAt: new Date().toISOString()
        };

        setTasks([...tasks, task]);

        // Create notification for the new task
        const notification = {
            id: Date.now(),
            title: "New Task Created",
            message: `Task "${newTask.title}" has been created`,
            priority: newTask.priority || "Medium",
            timestamp: new Date(),
            read: false
        };

        setNotifications([notification, ...notifications]);
        setCurrentView("taskList");
    };

    const handleLoginSuccess = (userData) => {
        setLoggedIn(true);
        setCurrentUser(userData || { name: "User", email: "user@example.com" });
        setCurrentView("dashboard");
    };

    const handleMarkNotificationAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const renderCurrentView = () => {
        switch(currentView) {
            case "dashboard":
                return (
                    <Dashboard
                        user={currentUser}
                        tasks={tasks}
                        notifications={notifications}
                        onMarkNotificationAsRead={handleMarkNotificationAsRead}
                        onLogout={() => setLoggedIn(false)}
                    />
                );
            case "taskList":
                return (
                    <TaskList
                        tasks={tasks}
                        onLogout={() => setLoggedIn(false)}
                        onNewTask={() => setCurrentView("newTask")}
                        onDashboard={() => setCurrentView("dashboard")}
                    />
                );
            case "newTask":
                return (
                    <NewTask
                        onCreateTask={handleCreateTask}
                        onCancel={() => setCurrentView("taskList")}
                    />
                );
            default:
                return (
                    <Dashboard
                        user={currentUser}
                        tasks={tasks}
                        notifications={notifications}
                        onMarkNotificationAsRead={handleMarkNotificationAsRead}
                        onLogout={() => setLoggedIn(false)}
                    />
                );
        }
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
            ) : (
                renderCurrentView()
            )}
        </div>
    );
};

export default App;