import { useState, useRef, useEffect } from "react"
import type { Notification } from "../../data/notifications"
import "./NotificationPanel.css"

interface Props {
    notifications: Notification[]
    onMarkAsRead: (notificationId: number) => void
    onDelete: (notificationId: number) => void
    onNotificationClick: (notification: Notification) => void
}

const NotificationPanel = ({
    notifications,
    onMarkAsRead,
    onDelete,
    onNotificationClick
}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const unreadCount = notifications.filter(n => !n.isRead).length

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleMarkAllAsRead = () => {
        notifications
            .filter(n => !n.isRead)
            .forEach(n => onMarkAsRead(n.id))
    }

    return (
        <div className={`notification-container ${isOpen ? "open" : ""}`} ref={containerRef}>
            <span
                className="notification-bell"
                onClick={() => setIsOpen(!isOpen)}
            >
                Thông báo
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </span>

            <div className="notification-dropdown">
                <div className="notification-header">
                    <h3>Thông báo</h3>
                    {notifications.length > 0 && (
                        <button
                            className="mark-all-read-btn"
                            onClick={handleMarkAllAsRead}
                        >
                            Đánh dấu tất cả đã đọc
                        </button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="notification-empty">Không có thông báo nào</div>
                ) : (
                    <div className="notification-list">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`notification-item ${notif.isRead ? "read" : "unread"}`}
                                onClick={() => {
                                    if (!notif.isRead) {
                                        onMarkAsRead(notif.id)
                                    }
                                    onNotificationClick(notif)
                                }}
                            >
                                <div className="notification-content">
                                    <div className="notification-title">{notif.title}</div>
                                    <div className="notification-message">{notif.message}</div>
                                    <div className="notification-time">{notif.createdAt}</div>
                                </div>
                                <button
                                    className="notification-delete"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(notif.id)
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationPanel
