import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select an option'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find(option => option.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.custom-select')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select">
      <div
        className="select-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label || placeholder}
      </div>
      {isOpen && (
        <div className="select-options">
          {options.map(option => (
            <div
              key={option.value}
              className="select-option"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;