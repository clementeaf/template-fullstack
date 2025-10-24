// Types for button schema
export interface ButtonConfig {
  id: string;
  text: string;
  loadingText?: string;
  errorText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick?: string;
  showLoading?: boolean;
  showError?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ButtonSection {
  id: string;
  title: string;
  description: string;
  layout?: 'normal' | 'group';
  buttons: ButtonConfig[];
}

export interface ButtonSchema {
  sections: ButtonSection[];
}

// State management types
export interface ButtonStates {
  loadingStates: Record<string, boolean>;
  errorStates: Record<string, boolean>;
}

// Action handlers
export type ButtonActionHandler = (buttonId: string) => void;
