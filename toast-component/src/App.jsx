import './App.css';
import useNotification from './hooks/useNotification';

function App() {
  //  custom hook => useNotification hook
  // Notification Component

  const { NotificationComponent, triggerNotification } =
    useNotification('bottom-left');

  return (
    <div className="app">
      <h1>Toast Component</h1>
      <button
        onClick={() =>
          triggerNotification({
            type: 'success',
            message: 'Message sent successfully',
            duration: 3000,
          })
        }
      >
        Trigger Success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: 'error',
            message: 'Message sent failed',
            duration: 3000,
          })
        }
      >
        Trigger Error
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: 'info',
            message: 'Message Info',
            duration: 3000,
          })
        }
      >
        Trigger Info
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: 'warning',
            message: 'Message warning',
            duration: 3000,
          })
        }
      >
        Trigger Warning
      </button>
      {NotificationComponent}
    </div>
  );
}

export default App;
