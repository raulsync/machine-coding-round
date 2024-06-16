import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from 'react-icons/ai';
import './Notification.css';

const iconStyles = { marginRight: '10px' };

const icons = {
  success: <AiOutlineCheck style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const Notification = ({ type = 'error', message, onClose = () => {} }) => {
  return (
    <div className={`notification ${type}`}>
      {icons[type]}
      {/* Notification type  success error info */}
      {/* Message */}
      {message}
      {/* Close */}
      <AiOutlineClose
        color="white"
        className="closeBtn"
        onClick={() => onClose()}
      />
    </div>
  );
};

export default Notification;
