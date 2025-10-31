export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}