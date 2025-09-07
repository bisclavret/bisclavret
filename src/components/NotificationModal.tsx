import React, { useEffect, useRef } from 'react';
import './NotificationModal.scss';

interface NotificationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  type?: 'success' | 'info' | 'warning' | 'error';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  message,
  onClose,
  type = 'info',
  autoClose = true,
  autoCloseDelay = 3000
}) => {
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownTargetRef.current = e.target;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Only close if both mousedown and mouseup occurred on the overlay
    if (mouseDownTargetRef.current === e.currentTarget && e.target === e.currentTarget) {
      onClose();
    }
    mouseDownTargetRef.current = null;
  };

  return (
    <div
      className="notification-modal-overlay"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={`notification-modal ${type}`} onClick={(e) => e.stopPropagation()}>
        <div className="notification-content">
          <div className="notification-icon">
            {type === 'success' && '✓'}
            {type === 'info' && 'ℹ'}
            {type === 'warning' && '⚠'}
            {type === 'error' && '✕'}
          </div>
          <div className="notification-message">{message}</div>
        </div>
        <button className="notification-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;