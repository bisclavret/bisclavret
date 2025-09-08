import React from 'react';
import { useTranslation } from 'react-i18next';

interface TemplateOption {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

interface NewStoryTemplateTabProps {
  selectedTemplate: string[];
  onTemplateToggle: (templateId: string) => void;
  onBack: () => void;
  onCreate: () => void;
}

const NewStoryTemplateTab: React.FC<NewStoryTemplateTabProps> = ({
  selectedTemplate,
  onTemplateToggle,
  onBack,
  onCreate
}) => {
  const { t } = useTranslation();

  const templateOptions: TemplateOption[] = [
    {
      id: 'cover',
      label: t('template.cover', 'Cover Page'),
      description: t('template.coverDesc', 'Include a title page with author information'),
      defaultChecked: true
    },
    {
      id: 'foreword',
      label: t('template.foreword', 'Foreword'),
      description: t('template.forewordDesc', 'Add a foreword section')
    },
    {
      id: 'dedication',
      label: t('template.dedication', 'Dedication'),
      description: t('template.dedicationDesc', 'Include a dedication page')
    },
    {
      id: 'acknowledgments',
      label: t('template.acknowledgments', 'Acknowledgments'),
      description: t('template.acknowledgmentsDesc', 'Add an acknowledgments section')
    },
    {
      id: 'table-of-contents',
      label: t('template.toc', 'Table of Contents'),
      description: t('template.tocDesc', 'Automatically generate table of contents'),
      defaultChecked: true
    },
    {
      id: 'chapters',
      label: t('template.chapters', 'Chapter Structure'),
      description: t('template.chaptersDesc', 'Organize content into chapters'),
      defaultChecked: true
    },
    {
      id: 'epilogue',
      label: t('template.epilogue', 'Epilogue'),
      description: t('template.epilogueDesc', 'Include an epilogue section')
    },
    {
      id: 'about-author',
      label: t('template.aboutAuthor', 'About the Author'),
      description: t('template.aboutAuthorDesc', 'Add an about the author section')
    }
  ];

  return (
    <div className="template-settings">
      <h3>{t('newStory.templateOptions', 'Template Options')}</h3>
      <p>{t('newStory.templateDescription', 'Choose which sections to include in your story template. You can always add or remove sections later.')}</p>

      {templateOptions.map(option => (
        <div key={option.id} className="form-group">
          <label className="checkbox-label">
            <div className="checkbox-text">
              <strong>{option.label}</strong>
              <br />
              <small>{option.description}</small>
            </div>
            <input
              type="checkbox"
              checked={selectedTemplate.includes(option.id)}
              onChange={() => onTemplateToggle(option.id)}
              className="input"
            />
          </label>
        </div>
      ))}

      <div className="form-group">
        <button onClick={onBack}>
          {t('common.back', 'Back')}
        </button>
        <button onClick={onCreate} className="save-button">
          {t('newStory.createStory', 'Create Story')}
        </button>
      </div>
    </div>
  );
};

export default NewStoryTemplateTab;