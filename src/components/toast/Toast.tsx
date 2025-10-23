import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'primary' | 'warning';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'primary', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем тост, когда компонент монтируется
    setIsVisible(true);

    // Скрываем тост через заданный промежуток времени
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={`toast ${type} ${isVisible ? 'toast_show' : ''}`}>
      <div className="toast__text">{message}</div>
      <button className="button button_icon button_small both-mode" onClick={handleClose}>
        <span className="toast__close-icon">&times;</span>
      </button>
    </div>
  );
};

export default Toast;
