import { ReactNode } from 'react';

export default function AdminLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mogul-dark via-mogul-darker to-mogul-dark font-body">
      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute top-[50%] left-[-20%] w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star" style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
        <div className="absolute top-[10%] left-[-15%] w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star" style={{ animationDelay: '6s', animationDuration: '12s' }}></div>
        <div className="absolute top-[70%] left-[-5%] w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star" style={{ animationDelay: '9s', animationDuration: '7s' }}></div>
        <div className="absolute top-[30%] left-[-30%] w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star" style={{ animationDelay: '12s', animationDuration: '9s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
