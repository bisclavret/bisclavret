import React from 'react';
import bisclavretLogo from '/bisclavret.png';

const LeftPanel: React.FC = () => {
  return (
    <div className="left-panel">
      <div className="logo-container">
        <img src={bisclavretLogo} className="logo" alt="Bisclavret" />
        <div className="sparkle-container">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>
      </div>
      <h1>Bisclavret</h1>
      <p className="subtitle">AI-powered Story Editor</p>
      <p className="info-text">Select a workspace or create a new story.</p>
    </div>
  );
};

export default LeftPanel;
