import { ReactNode } from 'react';

interface ActionButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    icon?: ReactNode;
    className?: string;
}

const variantStyles = {
    primary: 'border-mogul-gold text-mogul-gold hover:bg-mogul-gold hover:text-mogul-dark',
    secondary: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-mogul-dark',
    success: 'border-green-400 text-green-400 hover:bg-green-400 hover:text-mogul-dark',
    warning: 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-mogul-dark',
    danger: 'border-red-400 text-red-400 hover:bg-red-400 hover:text-mogul-dark',
};

export default function ActionButton({
    children,
    onClick,
    variant = 'primary',
    icon,
    className = '',
}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        flex items-center gap-2 px-4 py-2
        bg-transparent border rounded-lg
        font-medium text-sm
        transition-all duration-300
        ${variantStyles[variant]}
        ${className}
      `}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
}
