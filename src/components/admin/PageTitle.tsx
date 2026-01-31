import { ReactNode } from 'react';

interface PageTitleProps {
    children: ReactNode;
    className?: string;
}

export default function PageTitle({ children, className = '' }: PageTitleProps) {
    return (
        <h1
            className={`
        text-4xl md:text-5xl font-display font-bold text-mogul-gold
        text-center my-8
        ${className}
      `}
        >
            {children}
        </h1>
    );
}
