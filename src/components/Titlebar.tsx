// Titlebar.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDropdownMenu } from '../hooks/useDropdownMenu';
import MenuItem from './MenuItem';
import WindowControls from './WindowControls';
import icon from '../assets/icon.png';

interface TitlebarProps {
  onOpenPreferences?: (tab?: string) => void;
}

const Titlebar: React.FC<TitlebarProps> = ({ onOpenPreferences }) => {
  const { t } = useTranslation();
  const { activeDropdown, activeSubmenu, menuRef, openSubmenu, closeSubmenu, toggleDropdown, openDropdownOnHover } = useDropdownMenu();

  return (
    <div className="titlebar">
      {/* Left: Logo + Menus */}
      <div className="titlebar-left">
        <img src={icon} className="logo" alt={t('logoAlt')} />

        <div className="menu-bar" ref={menuRef}>
          <div className="menu">
            <span onClick={() => toggleDropdown('file')} onMouseEnter={() => openDropdownOnHover('file')}>{t('menu.file')}</span>
            {activeDropdown === 'file' && <div className="dropdown" onMouseEnter={() => openDropdownOnHover('file')}>
              <MenuItem label={t('fileMenu.newStory')} />
              <MenuItem label={t('fileMenu.newChapter')} />
              <hr />
              <MenuItem label={t('fileMenu.openStory')} />
              <hr />
              <MenuItem label={t('fileMenu.saveStory')} />
              <MenuItem label={t('fileMenu.saveAs')} />
              <hr />
              <MenuItem label={t('fileMenu.export')} />
              <MenuItem label={t('fileMenu.recentFiles')} />
              <div className="submenu-container" onMouseEnter={openSubmenu} onMouseLeave={closeSubmenu}>
                <MenuItem
                  label={t('fileMenu.preferences')}
                  hasSubmenu
                  onClick={() => { onOpenPreferences?.(); toggleDropdown(''); }}
                />
                {activeSubmenu === 'preferences' && <div className="submenu">
                  <MenuItem
                    label={t('preferencesMenu.themes')}
                    onClick={() => { onOpenPreferences?.('themes'); toggleDropdown(''); }}
                  />
                  <MenuItem
                    label={t('preferencesMenu.language')}
                    onClick={() => { onOpenPreferences?.('language'); toggleDropdown(''); }}
                  />
                  <MenuItem
                    label={t('preferencesMenu.aiModel')}
                    onClick={() => { onOpenPreferences?.('aiModel'); toggleDropdown(''); }}
                  />
                </div>}
              </div>
              <MenuItem label={t('fileMenu.exit')} />
            </div>}
          </div>

          <div className="menu">
            <span onClick={() => toggleDropdown('edit')} onMouseEnter={() => openDropdownOnHover('edit')}>{t('menu.edit')}</span>
            {activeDropdown === 'edit' && <div className="dropdown" onMouseEnter={() => openDropdownOnHover('edit')}>
              <MenuItem label={t('editMenu.undo')} />
              <MenuItem label={t('editMenu.redo')} />
              <MenuItem label={t('editMenu.cut')} />
              <MenuItem label={t('editMenu.copy')} />
              <MenuItem label={t('editMenu.paste')} />
              <MenuItem label={t('editMenu.find')} />
              <MenuItem label={t('editMenu.replace')} />
              <MenuItem label={t('editMenu.aiSuggestions')} />
              <MenuItem label={t('editMenu.grammarCheck')} />
            </div>}
          </div>

          <div className="menu">
            <span onClick={() => toggleDropdown('view')} onMouseEnter={() => openDropdownOnHover('view')}>{t('menu.view')}</span>
            {activeDropdown === 'view' && <div className="dropdown" onMouseEnter={() => openDropdownOnHover('view')}>
              <MenuItem label={t('viewMenu.toggleLeftPanel')} />
              <MenuItem label={t('viewMenu.toggleRightPanel')} />
              <MenuItem label={t('viewMenu.fullScreen')} />
              <MenuItem label={t('viewMenu.zoomIn')} />
              <MenuItem label={t('viewMenu.zoomOut')} />
            </div>}
          </div>

          <div className="menu">
            <span onClick={() => toggleDropdown('plugins')} onMouseEnter={() => openDropdownOnHover('plugins')}>{t('menu.plugins')}</span>
            {activeDropdown === 'plugins' && <div className="dropdown" onMouseEnter={() => openDropdownOnHover('plugins')}>
              <MenuItem label={t('pluginsMenu.managePlugins')} />
              <MenuItem label={t('pluginsMenu.installPlugin')} />
              <MenuItem label={t('pluginsMenu.luaScriptEditor')} />
              <MenuItem label={t('pluginsMenu.runLuaScript')} />
            </div>}
          </div>

          <div className="menu">
            <span onClick={() => toggleDropdown('help')} onMouseEnter={() => openDropdownOnHover('help')}>{t('menu.help')}</span>
            {activeDropdown === 'help' && <div className="dropdown" onMouseEnter={() => openDropdownOnHover('help')}>
              <MenuItem label={t('helpMenu.documentation')} />
              <MenuItem label={t('helpMenu.about')} />
              <MenuItem label={t('helpMenu.checkForUpdates')} />
            </div>}
          </div>
        </div>
      </div>

      {/* Center: Title */}
      <div className="titlebar-center">{t('title')}</div>

      {/* Right: Window buttons */}
      <WindowControls />
    </div>
  );
};

export default Titlebar;
