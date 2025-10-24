import React from 'react';
import { Button } from '../../common-ui';
import type { ButtonSection as ButtonSectionType, ButtonConfig } from './types';

interface ButtonSectionProps {
  section: ButtonSectionType;
  getButtonText: (buttonId: string, text: string, loadingText?: string, errorText?: string) => string;
  getButtonLoading: (buttonId: string) => boolean;
  getButtonDisabled: (buttonId: string, defaultDisabled?: boolean) => boolean;
  getButtonOnClick: (onClick?: string, buttonId?: string) => (() => void) | undefined;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({
  section,
  getButtonText,
  getButtonLoading,
  getButtonDisabled,
  getButtonOnClick
}) => {
  const renderButton = (button: ButtonConfig) => {
    const onClick = getButtonOnClick(button.onClick, button.id);

    return (
      <Button
        key={button.id}
        variant={button.variant}
        size={button.size}
        icon={button.icon}
        iconPosition={button.iconPosition}
        loading={getButtonLoading(button.id)}
        disabled={getButtonDisabled(button.id, button.disabled)}
        onClick={onClick}
        className={button.className}
      >
        {getButtonText(button.id, button.text, button.loadingText, button.errorText)}
      </Button>
    );
  };

  if (section.layout === 'group') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
        <p className="text-gray-600 mb-4">{section.description}</p>
        <div className="flex space-x-2">
          {section.buttons.map(renderButton)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
      <p className="text-gray-600 mb-4">{section.description}</p>
      <div className="space-y-3">
        {section.buttons.map(renderButton)}
      </div>
    </div>
  );
};

export default ButtonSection;
