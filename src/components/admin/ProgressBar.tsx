interface ProgressBarProps {
    percentage: number;
    showLabel?: boolean;
}

export default function ProgressBar({ percentage, showLabel = true }: ProgressBarProps) {
    return (
        <div className="w-full">
            <div className="bg-gray-700 h-2.5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-mogul-gold transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
            </div>
            {showLabel && (
                <div className="text-sm text-gray-400 mt-1">
                    {percentage}%
                </div>
            )}
        </div>
    );
}
