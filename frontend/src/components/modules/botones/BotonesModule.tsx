import React from 'react';
import { useButtonStates } from './useButtonStates';
import ButtonSection from './ButtonSection';
import buttonSchema from './buttonSchema.json';
import type { ButtonSchema } from './types';

const BotonesModule: React.FC = () => {
  const {
    getButtonText,
    getButtonLoading,
    getButtonDisabled,
    getButtonOnClick
  } = useButtonStates();

  const schema = buttonSchema as ButtonSchema;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Botones</h1>
        <p className="text-gray-600">Módulo de demostración del componente Button en diferentes estados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schema.sections.map((section) => (
          <ButtonSection
            key={section.id}
            section={section}
            getButtonText={getButtonText}
            getButtonLoading={getButtonLoading}
            getButtonDisabled={getButtonDisabled}
            getButtonOnClick={getButtonOnClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BotonesModule;
