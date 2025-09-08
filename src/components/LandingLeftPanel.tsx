import React from 'react';
import { useTranslation } from 'react-i18next';
import bisclavretLogo from '/bisclavret.png';

const LandingLeftPanel: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="left-panel">
      <div className="logo-container">
        <img src={bisclavretLogo} className="logo" alt="Bisclavret" />
        <div className="purple-swirl"></div>
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
        <div className="swirl-sparkle-container">
          <div className="swirl-sparkle"></div>
          <div className="swirl-sparkle"></div>
          <div className="swirl-sparkle"></div>
          <div className="swirl-sparkle"></div>
          <div className="swirl-sparkle"></div>
          <div className="swirl-sparkle"></div>
        </div>
      </div>
      <h1>Bisclavret</h1>
      <p className="subtitle">{t('leftPanel.subtitle')}</p>
      <p className="info-text">{t('leftPanel.infoText')}</p>
    </div>
  );
};

export default LandingLeftPanel;
