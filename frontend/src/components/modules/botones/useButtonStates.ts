import { useState, useCallback } from 'react';
import { ButtonStates, ButtonActionHandler } from './types';

export const useButtonStates = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});

  const handleLoading: ButtonActionHandler = useCallback((buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  }, []);

  const handleError: ButtonActionHandler = useCallback((buttonId: string) => {
    setErrorStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setErrorStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  }, []);

  const getButtonText = (buttonId: string, text: string, loadingText?: string, errorText?: string): string => {
    if (loadingStates[buttonId] && loadingText) {
      return loadingText;
    }
    if (errorStates[buttonId] && errorText) {
      return errorText;
    }
    return text;
  };

  const getButtonLoading = (buttonId: string): boolean => {
    return loadingStates[buttonId] || false;
  };

  const getButtonDisabled = (buttonId: string, defaultDisabled?: boolean): boolean => {
    return defaultDisabled || errorStates[buttonId] || false;
  };

  const getButtonOnClick = (onClick?: string): (() => void) | undefined => {
    if (!onClick) return undefined;
    
    switch (onClick) {
      case 'handleLoading':
        return (buttonId: string) => handleLoading(buttonId);
      case 'handleError':
        return (buttonId: string) => handleError(buttonId);
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
