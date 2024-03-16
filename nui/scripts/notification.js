
class NotificationManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            throw new Error('Container not found.');
        }
        this.notifications = [];
    }

    show(title, message, iconSrc, alwaysOnTop = false, timeInSeconds = null) {
        const notification = this.createNotification(title, message, iconSrc, alwaysOnTop);
        this.addNotification(notification, alwaysOnTop);
        this.notifications.push(notification);

        if (timeInSeconds !== null && !alwaysOnTop) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, timeInSeconds * 1000);
        }
    }

    createNotification(title, message, iconSrc, alwaysOnTop) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (alwaysOnTop) {
            notification.classList.add('always-on-top');
        }
        notification.innerHTML = `
            <img src="${iconSrc}">
            <strong>${title}</strong>
            <p>${message}</p>
        `;
        if (!alwaysOnTop) {
            notification.innerHTML += `<button class="close-btn">&times;</button>`;
        }
        return notification;
    }

    addNotification(notification, alwaysOnTop) {
        const existingNotifications = this.container.querySelectorAll('.notification');
        const topNotification = existingNotifications[0];
        if (topNotification && !alwaysOnTop) {
            this.container.insertBefore(notification, topNotification);
        } else {
            this.container.appendChild(notification);
        }
        this.attachCloseEvent(notification);
        notification.style.display = 'block';
    }

    removeNotification(notification) {
        notification.classList.add('exiting');
        setTimeout(() => {
            notification.remove();
            this.notifications = this.notifications.filter(item => item !== notification);
        }, 500);
    }

    attachCloseEvent(notification) {
        const closeButton = notification.querySelector('.close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.removeNotification(notification);
            });
        }
    }
}

const notificationManager = new NotificationManager('.phone');

document.addEventListener('DOMContentLoaded', function() {
    const notificationButton = document.getElementById('notificationButton');
    if (notificationButton) {
        notificationButton.addEventListener('click', function() {
            notificationManager.show('Título da Notificação', 'Esta é a mensagem de descrição da notificação.', 'caminho/para/o/seu/icone.png', false, 3);
        });
    }
});