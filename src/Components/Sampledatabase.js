
const databaseSchema = {
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "developer",
            notificationPreferences: {
                email: true,
                push: true,
                sms: false,
                priorityFilter: ["Critical", "High"]
            }
        }
    ],
    tasks: [
        {
            id: 1,
            title: "Complete project documentation",
            description: "Finalize all project documentation for submission",
            status: "In Progress",
            priority: "High",
            dueDate: "2023-12-15",
            assigneeId: 1,
            createdAt: "2023-12-01T10:00:00Z",
            updatedAt: "2023-12-05T15:30:00Z"
        }
    ],
    notifications: [
        {
            id: 1,
            userId: 1,
            title: "Task Deadline Approaching",
            message: "The task 'Complete project documentation' is due in 10 days",
            type: "reminder",
            priority: "High",
            relatedEntity: "task",
            relatedEntityId: 1,
            timestamp: "2023-12-05T09:00:00Z",
            read: false,
            acknowledged: false
        }
    ],
    notification_rules: [
        {
            id: 1,
            name: "Task Deadline Warning",
            description: "Notify users when tasks are approaching deadline",
            triggerEntity: "task",
            triggerCondition: "dueDate < now() + 10 days",
            notificationTitle: "Task Deadline Approaching",
            notificationMessage: "The task '{{taskTitle}}' is due in {{daysRemaining}} days",
            priority: "High",
            enabled: true
        }
    ]
};