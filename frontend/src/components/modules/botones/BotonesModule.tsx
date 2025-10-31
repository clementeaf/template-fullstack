import React from 'react';
import { Button } from '../../common-ui';
import type { ButtonProps } from '../../common-ui/types';
import { buttonVariantClasses, buttonSizeClasses } from '../../common-ui/buttonUtils';

/**
 * Tipo para las variantes del botón
 */
type ButtonVariant = keyof typeof buttonVariantClasses;

/**
 * Tipo para los tamaños del botón
 */
type ButtonSize = keyof typeof buttonSizeClasses;

/**
 * Genera el label a mostrar para una variante
 * @param variant - Variante del botón
 * @returns Label formateado
 */
const getVariantLabel = (variant: string): string => {
  return variant.charAt(0).toUpperCase() + variant.slice(1);
};

/**
 * Genera el label a mostrar para un tamaño
 * @param size - Tamaño del botón
 * @returns Label formateado
 */
const getSizeLabel = (size: string): string => {
  const sizeLabels: Record<string, string> = {
    sm: 'Pequeño',
    md: 'Mediano',
    lg: 'Grande'
  };
  return sizeLabels[size] || size.toUpperCase();
};

/**
 * Componente principal del módulo de botones
 * Muestra botones para cada variante y cada tamaño disponibles
 */
const BotonesModule: React.FC = () => {
  const variants = Object.keys(buttonVariantClasses) as ButtonVariant[];
  const sizes = Object.keys(buttonSizeClasses) as ButtonSize[];

  return (
    <div className="flex flex-col w-full h-full items-start justify-start">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Botones</h1>
        <p className="text-gray-600">Módulo de demostración del componente Button en diferentes estados</p>
      </section>

      {/* Sección de Variantes */}
      <section className='mt-10'>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Variantes de Color</h2>
        <p className="text-gray-600 mb-6">
          Muestra todas las variantes de color disponibles para el componente Button
        </p>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant: ButtonVariant) => (
            <Button
              key={variant}
              variant={variant as ButtonProps['variant']}
              size="md"
            >
              {getVariantLabel(variant)}
            </Button>
          ))}
        </div>
      </section>

      {/* Sección de Tamaños */}
      <section className='mt-10'>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tamaños</h2>
        <p className="text-gray-600 mb-6">
          Muestra todos los tamaños disponibles para el componente Button
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {sizes.map((size: ButtonSize) => (
            <Button
              key={size}
              variant="primary"
              size={size as ButtonProps['size']}
            >
              {getSizeLabel(size)}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BotonesModule;
