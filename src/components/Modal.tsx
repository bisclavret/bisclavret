import React, { useRef } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

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
      className="modal-overlay"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;