interface StatCardProps {
    value: string | number;
    label: string;
    className?: string;
}

export default function StatCard({ value, label, className = '' }: StatCardProps) {
    return (
        <div
            className={`
        bg-mogul-darker rounded-2xl p-8 text-center
        animate-pulse-glow transition-transform duration-300
        hover:-translate-y-2
        ${className}
      `}
        >
            <div className="text-4xl md:text-5xl font-bold text-mogul-gold mb-2">
                {value}
            </div>
            <div className="text-base md:text-lg text-gray-300">
                {label}
            </div>
        </div>
    );
}
