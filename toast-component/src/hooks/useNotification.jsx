import { useCallback, useState } from 'react';
import Notification from '../components/Notification';

const useNotification = (position = 'top-right') => {
  const [notification, setNotification] = useState(null);

  //here we use the usecallback to call the function only once so that timer get restart on every click
  const triggerNotification = useCallback((notificationProps) => {
    setNotification(notificationProps);
    setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration);
  }, []);

  const NotificationComponent = notification ? (
    <div className={`${position}`}>
      <Notification {...notification} />
    </div>
  ) : null;

  return {
    NotificationComponent,
    triggerNotification,
  };
};

export default useNotification;
