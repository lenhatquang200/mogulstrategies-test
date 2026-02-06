'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import StarryBackground from '@/components/admin/StarryBackground';
import { usePathname } from 'next/navigation';
import "./admin.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <div className="min-h-screen bg-black text-gray-200 flex">
            {/* Starry Background */}
            <StarryBackground />

            {/* Sidebar - Hidden on login page */}
            {!isLoginPage && <AdminSidebar />}

            {/* Main Content */}
            <main className={`flex-1 w-full ${!isLoginPage ? 'lg:ml-[280px] p-4 md:p-8 lg:w-[calc(100%-280px)]' : ''}`}>
                {children}
            </main>

            {/* Footer - Hidden on login page */}
            {!isLoginPage && (
                <footer className="fixed bottom-0 left-0 lg:left-[280px] right-0 text-center py-4 text-sm text-gray-500 bg-black/50 backdrop-blur-sm">
                    <p>&copy; 2025 Mogul Strategies Inc. | Admin Portal</p>
                </footer>
            )}
        </div>
    );
}


