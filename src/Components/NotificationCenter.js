// File: NotificationCenter.js
import React, { useState, useEffect } from "react";

const NotificationCenter = ({ notifications, onMarkAsRead }) => {
    const [filter, setFilter] = useState("All");

    const filteredNotifications = notifications.filter(notification => {
        return filter === "All" || notification.priority === filter;
    });

    const getPriorityColor = (priority) => {
        switch(priority) {
            case "Critical": return "bg-red-100 border-red-400 text-red-800";
            case "High": return "bg-orange-100 border-orange-400 text-orange-800";
            case "Medium": return "bg-yellow-100 border-yellow-400 text-yellow-800";
            case "Low": return "bg-blue-100 border-blue-400 text-blue-800";
            default: return "bg-gray-100 border-gray-400 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">Notifications</h2>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1"
                >
                    <option value="All">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No notifications</p>
                ) : (
                    filteredNotifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`p-4 border-l-4 rounded ${getPriorityColor(notification.priority)} ${notification.read ? 'opacity-70' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{notification.title}</h3>
                                    <p className="text-sm mt-1">{notification.message}</p>
                                    <p className="text-xs mt-2 text-gray-600">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <button
                                        onClick={() => onMarkAsRead(notification.id)}
                                        className="text-xs bg-white px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationCenter;