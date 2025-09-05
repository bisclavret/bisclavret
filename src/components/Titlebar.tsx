import React from 'react';
import { useWindowControls } from '../hooks/useWindowControls';

const Titlebar: React.FC = () => {
  const { minimizeWindow, maximizeWindow, closeWindow, isMaximized } = useWindowControls();

  return (
    <div className="titlebar">
      {/* Left: Logo + Menus */}
      <div className="titlebar-left">
        <img src="/src-tauri/icons/icon.png" className="logo" alt="Bisclavret Logo" />

        <div className="menu-bar">
          <div className="menu">
            <span>File</span>
            <div className="dropdown">
              <div className="dropdown-item">New Story</div>
              <div className="dropdown-item">Open</div>
              <div className="dropdown-item">Save</div>
              <div className="dropdown-item">Exit</div>
            </div>
          </div>
          <div className="menu"><span>Edit</span></div>
          <div className="menu"><span>View</span></div>
          <div className="menu"><span>Plugins</span></div>
          <div className="menu"><span>Help</span></div>
        </div>
      </div>

      {/* Center: Title */}
      <div className="titlebar-center">Bisclavret</div>

      {/* Right: Window buttons */}
      <div className="titlebar-right window-controls">
        <button id="maximize" onClick={maximizeWindow} title={isMaximized ? "Restore" : "Maximize"}>
          {isMaximized ? (
            <svg viewBox="0 0 8 8" width="8" height="8">
              <rect x="2" y="3" width="4" height="3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none"/>
              <rect x="3" y="2" width="4" height="3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none"/>
            </svg>
          ) : (
            <svg viewBox="0 0 8 8" width="8" height="8">
              <rect x="1.5" y="1.5" width="5" height="5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" fill="none"/>
            </svg>
          )}
        </button>
        <button id="minimize" onClick={minimizeWindow} title="Minimize">
          <svg viewBox="0 0 8 8" width="8" height="8">
            <line x1="1" y1="4" x2="7" y2="4" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
          </svg>
        </button>
        <button id="close" onClick={closeWindow} title="Close">
          <svg viewBox="0 0 8 8" width="8" height="8">
            <line x1="1" y1="1" x2="7" y2="7" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
            <line x1="7" y1="1" x2="1" y2="7" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Titlebar;
