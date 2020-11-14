import React, { useContext } from 'react';
import { GlobalContext_notification } from '../../../context/GlobalState_notification';
import { Reminder } from './Reminder';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

export const NotificationList = () => {
    const { notifications } = useContext(GlobalContext_notification);

    function notificationIcon(notifications) {
        if (notifications.length === 0) {
            return (<NotificationsNoneIcon style={{ color: '#404040', fontSize: 24 }} />);
        } else {
            return (<NotificationsIcon style={{ color: '#404040', fontSize: 24 }} />);
        }
    }

    function notificationListContent(notifications) {
        if (notifications.length === 0) {
            return (<p>There is no notification.</p>);
        } else {
            return (notifications.map(notification => {
                return (
                    <Reminder key={notification._id} reminder={notification} />
                )
            }));
        }
    }

    return (
        <>
            {notificationIcon(notifications)}
            <div className="notification">
                <h3>Notifications</h3>
                <ul className="list">
                    {notificationListContent(notifications)}
                </ul>
            </div>
        </>
    );
};