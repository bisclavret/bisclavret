import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import NewStorySetupTab from './NewStorySetupTab';
import NewStoryTemplateTab from './NewStoryTemplateTab';

interface NewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStory: (storyData: {
    title: string;
    genre: string;
    template: string[];
  }) => void;
  onShowNotification?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const NewStoryModal: React.FC<NewStoryModalProps> = ({
  isOpen,
  onClose,
  onCreateStory,
  onShowNotification
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'setup' | 'template'>('setup');
  const [storyTitle, setStoryTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string[]>([]);

  const handleTemplateToggle = (templateId: string) => {
    setSelectedTemplate(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleNext = () => {
    setActiveTab('template');
  };

  const handleBack = () => {
    setActiveTab('setup');
  };

  const handleCreate = () => {
    if (!storyTitle.trim()) {
      if (onShowNotification) {
        onShowNotification(t('error.titleRequired', 'Please enter a story title'), 'warning');
      }
      return;
    }

    onCreateStory({
      title: storyTitle.trim(),
      genre: selectedGenre,
      template: selectedTemplate
    });

    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setActiveTab('setup');
    setStoryTitle('');
    setSelectedGenre('');
    setSelectedTemplate(['cover', 'table-of-contents', 'chapters']); // Default selections
  };

  // Initialize default template selections only when modal first opens
  React.useEffect(() => {
    if (isOpen && selectedTemplate.length === 0) {
      setSelectedTemplate(['cover', 'table-of-contents', 'chapters']);
    }
  }, [isOpen]); // Remove selectedTemplate.length from dependencies

  const tabs = [
    {
      id: 'setup',
      label: t('newStory.setupTab', 'Setup'),
      content: (
        <NewStorySetupTab
          storyTitle={storyTitle}
          selectedGenre={selectedGenre}
          onTitleChange={setStoryTitle}
          onGenreChange={setSelectedGenre}
          onNext={handleNext}
        />
      )
    },
    {
      id: 'template',
      label: t('newStory.templateTab', 'Template'),
      content: (
        <NewStoryTemplateTab
          selectedTemplate={selectedTemplate}
          onTemplateToggle={handleTemplateToggle}
          onBack={handleBack}
          onCreate={handleCreate}
        />
      ),
      disabled: !storyTitle.trim()
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <h2>{t('newStory.title', 'Create New Story')}</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      <div className="modal-body">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id as 'setup' | 'template')}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </Modal>
  );
};

export default NewStoryModal;