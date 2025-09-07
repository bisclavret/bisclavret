import React from 'react';
import { useTranslation } from 'react-i18next';
import bisclavretLogo from '/bisclavret.png';

const LeftPanel: React.FC = () => {
  const { t } = useTranslation();
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
      <p className="subtitle">{t('leftPanel.subtitle')}</p>
      <p className="info-text">{t('leftPanel.infoText')}</p>
    </div>
  );
};

export default LeftPanel;
