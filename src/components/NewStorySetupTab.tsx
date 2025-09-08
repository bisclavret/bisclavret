import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from './CustomSelect';

interface NewStorySetupTabProps {
  storyTitle: string;
  selectedGenre: string;
  onTitleChange: (title: string) => void;
  onGenreChange: (genre: string) => void;
  onNext: () => void;
}

const NewStorySetupTab: React.FC<NewStorySetupTabProps> = ({
  storyTitle,
  selectedGenre,
  onTitleChange,
  onGenreChange,
  onNext
}) => {
  const { t } = useTranslation();

  const genreOptions = [
    { value: '', label: t('newStory.selectGenre', 'Select a genre (optional)') },
    { value: 'fantasy', label: t('genre.fantasy', 'Fantasy') },
    { value: 'scifi', label: t('genre.scifi', 'Science Fiction') },
    { value: 'romance', label: t('genre.romance', 'Romance') },
    { value: 'mystery', label: t('genre.mystery', 'Mystery') },
    { value: 'thriller', label: t('genre.thriller', 'Thriller') },
    { value: 'horror', label: t('genre.horror', 'Horror') },
    { value: 'historical', label: t('genre.historical', 'Historical Fiction') },
    { value: 'contemporary', label: t('genre.contemporary', 'Contemporary') },
    { value: 'literary', label: t('genre.literary', 'Literary Fiction') },
    { value: 'nonfiction', label: t('genre.nonfiction', 'Non-Fiction') },
    { value: 'other', label: t('genre.other', 'Other') }
  ];

  const handleNext = () => {
    if (!storyTitle.trim()) {
      alert(t('error.titleRequired', 'Please enter a story title'));
      return;
    }
    onNext();
  };

  return (
    <div className="setup-settings">
      <h3>{t('newStory.setup', 'Story Setup')}</h3>
      <p>{t('newStory.setupDescription', 'Start by giving your story a title and selecting a genre.')}</p>

      <div className="form-group">
        <label>{t('newStory.storyTitle', 'Story Title')} *</label>
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={t('newStory.titlePlaceholder', 'Enter your story title')}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>{t('newStory.genre', 'Genre')}</label>
        <CustomSelect
          value={selectedGenre}
          options={genreOptions}
          onChange={onGenreChange}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!storyTitle.trim()}
        className="save-button"
      >
        {t('common.next', 'Next')}
      </button>
    </div>
  );
};

export default NewStorySetupTab;