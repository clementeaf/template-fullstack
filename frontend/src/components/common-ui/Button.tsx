import React from 'react';
import { buttonVariantClasses, buttonSizeClasses } from './buttonUtils';
import type { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': testId
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const disabledClasses = (disabled || loading)
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  const buttonClasses = [
    baseClasses,
    buttonVariantClasses[variant] || buttonVariantClasses.primary,
    buttonSizeClasses[size] || buttonSizeClasses.md,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled || loading || !onClick) {
      return;
    }
    onClick(event);
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      data-testid={testId}
    >
      {loading && (
        <span className="mr-2">
          <svg 
            className="animate-spin h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
