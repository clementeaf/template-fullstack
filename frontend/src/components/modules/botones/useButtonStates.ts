import { useState, useCallback } from 'react';
import { get } from 'radashi';
import type { ButtonActionHandler } from './types';

/**
 * Hook personalizado para gestionar los estados de los botones (loading, error, disabled)
 * @returns Objeto con funciones y estados para gestionar botones
 */
export const useButtonStates = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});

  /**
   * Maneja el estado de carga de un botón
   * @param buttonId - ID del botón
   */
  const handleLoading: ButtonActionHandler = useCallback((buttonId: string): void => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  }, []);

  /**
   * Maneja el estado de error de un botón
   * @param buttonId - ID del botón
   */
  const handleError: ButtonActionHandler = useCallback((buttonId: string): void => {
    setErrorStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setErrorStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  }, []);

  /**
   * Obtiene el texto apropiado para un botón según su estado
   * @param buttonId - ID del botón
   * @param text - Texto por defecto
   * @param loadingText - Texto cuando está cargando
   * @param errorText - Texto cuando hay error
   * @returns Texto a mostrar en el botón
   */
  const getButtonText = (buttonId: string, text: string, loadingText?: string, errorText?: string): string => {
    const isLoading = get(loadingStates, buttonId, false) as boolean;
    const hasError = get(errorStates, buttonId, false) as boolean;
    
    if (isLoading && loadingText) {
      return loadingText;
    }
    if (hasError && errorText) {
      return errorText;
    }
    return text;
  };

  /**
   * Obtiene el estado de carga de un botón
   * @param buttonId - ID del botón
   * @returns true si el botón está en estado de carga
   */
  const getButtonLoading = (buttonId: string): boolean => {
    return get(loadingStates, buttonId, false) as boolean;
  };

  /**
   * Obtiene el estado deshabilitado de un botón
   * @param buttonId - ID del botón
   * @param defaultDisabled - Estado deshabilitado por defecto
   * @returns true si el botón está deshabilitado
   */
  const getButtonDisabled = (buttonId: string, defaultDisabled?: boolean): boolean => {
    const hasError = get(errorStates, buttonId, false) as boolean;
    return defaultDisabled || hasError || false;
  };

  /**
   * Obtiene la función onClick para un botón según su configuración
   * @param onClick - Tipo de acción onClick
   * @param buttonId - ID del botón
   * @returns Función onClick o undefined
   */
  const getButtonOnClick = (onClick?: string, buttonId?: string): (() => void) | undefined => {
    if (!onClick || !buttonId) return undefined;
    
    switch (onClick) {
      case 'handleLoading':
        return () => handleLoading(buttonId);
      case 'handleError':
        return () => handleError(buttonId);
      default:
        return undefined;
    }
  };

  return {
    loadingStates,
    errorStates,
    handleLoading,
    handleError,
    getButtonText,
    getButtonLoading,
    getButtonDisabled,
    getButtonOnClick
  };
};
