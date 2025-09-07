import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { open } from '@tauri-apps/plugin-dialog';
import CustomSelect from './CustomSelect';

interface AIModelTabProps {
  aiModelPath: string;
  onModelPathChange: (path: string) => void;
  onShowNotification?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const AIModelTab: React.FC<AIModelTabProps> = ({ aiModelPath, onModelPathChange, onShowNotification }) => {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState<'setup' | 'prompt'>('setup');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [promptTemplate, setPromptTemplate] = useState<string>('');

  const handleSelectModel = async () => {
    try {
      const selected = await open({
        multiple: false,
        directory: false,
        title: t('settings.selectModel'),
      });
      if (selected && typeof selected === 'string') {
        onModelPathChange(selected);
      }
    } catch (error) {
      console.error('Error selecting model:', error);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('aiModelSelected', selectedModel);
    localStorage.setItem('aiModelApiKey', apiKey);
    localStorage.setItem('aiModelPromptTemplate', promptTemplate);
    console.log('Saving AI Model settings:', { selectedModel, apiKey, promptTemplate, aiModelPath });

    // Show success notification instead of alert
    if (onShowNotification) {
      onShowNotification(t('notifications.settingsSaved'), 'success');
    }
  };

  // Load saved settings on component mount
  React.useEffect(() => {
    const savedModel = localStorage.getItem('aiModelSelected');
    const savedApiKey = localStorage.getItem('aiModelApiKey');
    const savedPromptTemplate = localStorage.getItem('aiModelPromptTemplate');

    if (savedModel) setSelectedModel(savedModel);
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedPromptTemplate) setPromptTemplate(savedPromptTemplate);
  }, []);

  return (
    <div className="ai-model-settings">
      <div className="tab-header">
        <h3>{t('settings.aiModel')}</h3>
        <div className="sub-tabs">
          <button
            className={activeSubTab === 'setup' ? 'active' : ''}
            onClick={() => setActiveSubTab('setup')}
          >
            {t('settings.setup')}
          </button>
          <button
            className={activeSubTab === 'prompt' ? 'active' : ''}
            onClick={() => setActiveSubTab('prompt')}
          >
            {t('settings.prompt')}
          </button>
        </div>
      </div>
      <div className="sub-tab-content">
        {activeSubTab === 'setup' && (
          <div className="setup-content">
            <div className="form-group">
              <label>{t('settings.selectAIModel')}:</label>
              <CustomSelect
                options={[
                  { value: 'openai', label: 'OpenAI' },
                  { value: 'anthropic', label: 'Anthropic' },
                  { value: 'google', label: 'Google Gemini' },
                  { value: 'local', label: 'Local Model' }
                ]}
                value={selectedModel}
                onChange={setSelectedModel}
                placeholder={t('settings.selectModel')}
              />
            </div>

            {selectedModel && selectedModel !== 'local' && (
              <div className="form-group">
                <label>{t('settings.apiKey')}:</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={t('settings.enterApiKey')}
                  className="api-key-input"
                />
              </div>
            )}

            {selectedModel === 'local' && (
              <div className="form-group">
                <label>{t('settings.modelPath')}:</label>
                <p>{aiModelPath || 'Not selected'}</p>
                <button onClick={handleSelectModel}>{t('settings.selectModel')}</button>
              </div>
            )}

            <button onClick={handleSaveSettings} className="save-button">
              {t('settings.save')}
            </button>
          </div>
        )}
        {activeSubTab === 'prompt' && (
          <div className="prompt-content">
            <label>{t('settings.promptTemplate')}:</label>
            <textarea
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              placeholder={t('settings.promptTemplatePlaceholder')}
            />
            <button onClick={handleSaveSettings} className="save-button">
              {t('settings.save')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIModelTab;