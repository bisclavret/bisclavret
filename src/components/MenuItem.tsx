import React from 'react';

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  hasSubmenu = false,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      className="dropdown-item"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="menu-text">{label}</span>
      {hasSubmenu && <span className="menu-chevron">›</span>}
    </div>
  );
};

export default MenuItem;