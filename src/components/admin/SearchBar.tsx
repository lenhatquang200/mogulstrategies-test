import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export default function SearchBar({
    placeholder = 'Search...',
    value,
    onChange,
    className = '',
}: SearchBarProps) {
    return (
        <div className={`relative ${className}`}>
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mogul-gold" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="
          w-full pl-12 pr-4 py-4
          bg-mogul-dark border border-mogul-gold rounded-lg
          text-gray-200 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-mogul-gold
          transition-all duration-300
        "
            />
        </div>
    );
}
