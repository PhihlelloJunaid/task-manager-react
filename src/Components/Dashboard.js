// File: Dashboard.js
import React, { useState, useEffect } from "react";
import NotificationCenter from "./NotificationCenter";

const Dashboard = ({ user, tasks, notifications, onMarkNotificationAsRead, onLogout }) => {
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        criticalNotifications: 0
    });

    useEffect(() => {
        // Calculate stats
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === "Done").length;
        const overdueTasks = tasks.filter(task =>
            task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done"
        ).length;
        const criticalNotifications = notifications.filter(
            n => n.priority === "Critical" && !n.read
        ).length;

        setStats({
            totalTasks,
            completedTasks,
            overdueTasks,
            criticalNotifications
        });
    }, [tasks, notifications]);

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user.name}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                        <h3 className="text-lg font-semibold text-gray-700">Overdue</h3>
                        <p className="text-3xl font-bold text-red-600">{stats.overdueTasks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                        <h3 className="text-lg font-semibold text-gray-700">Critical Notifications</h3>
                        <p className="text-3xl font-bold text-orange-600">{stats.criticalNotifications}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Tasks */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-blue-900 mb-4">Recent Tasks</h2>
                        <div className="space-y-4">
                            {tasks.slice(0, 5).map(task => (
                                <div key={task.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{task.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                Due: {task.dueDate || "No due date"}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            task.status === "Done"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                      {task.status}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <NotificationCenter
                        notifications={notifications.slice(0, 5)}
                        onMarkAsRead={onMarkNotificationAsRead}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;