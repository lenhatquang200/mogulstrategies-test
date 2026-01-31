interface StatusBadgeProps {
    status: 'paid' | 'pending' | 'overdue' | 'draft' | 'active' | 'inactive';
    children: React.ReactNode;
}

const statusStyles = {
    paid: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    overdue: 'bg-red-500/20 text-red-400',
    draft: 'bg-gray-500/20 text-gray-400',
    active: 'bg-green-500/20 text-green-400',
    inactive: 'bg-gray-500/20 text-gray-400',
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
    return (
        <span
            className={`
        inline-block px-4 py-2 rounded-full text-sm font-bold
        ${statusStyles[status]}
      `}
        >
            {children}
        </span>
    );
}
