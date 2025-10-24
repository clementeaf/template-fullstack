import { useState, useCallback } from 'react';
import type { ButtonActionHandler } from './types';

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
