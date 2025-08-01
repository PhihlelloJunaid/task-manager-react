// File: Notification.test.js
import { checkNotificationRules, createNotification } from './notificationService';

describe('Notification System', () => {
    test('should create notification for task approaching deadline', () => {
        const task = {
            id: 1,
            title: 'Test Task',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
        };

        const user = { id: 1, name: 'Test User' };
        const rules = [{
            triggerEntity: 'task',
            triggerCondition: (task) => {
                const daysRemaining = Math.floor((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                return daysRemaining <= 7;
            },
            notificationTitle: 'Task Deadline Approaching',
            notificationMessage: `Task "${task.title}" is due soon`
        }];

        const notifications = checkNotificationRules(task, user, rules);
        expect(notifications).toHaveLength(1);
        expect(notifications[0].title).toBe('Task Deadline Approaching');
    });

    test('should prioritize critical notifications correctly', () => {
        const notification = createNotification(
            1,
            'System Update',
            'Critical security update required',
            'Critical'
        );

        expect(notification.priority).toBe('Critical');
        expect(notification.read).toBe(false);
    });
});