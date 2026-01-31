'use client';

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#0A1A2F',
                        color: '#D4AF37',
                        border: '1px solid #D4AF37',
                        borderRadius: '8px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#D4AF37',
                            secondary: '#0A1A2F',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ff6b6b',
                            secondary: '#0A1A2F',
                        },
                        style: {
                            background: '#0A1A2F',
                            color: '#ff6b6b',
                            borderColor: '#ff6b6b'
                        }
                    },
                    loading: {
                        style: {
                            color: '#E0E0E0',
                            borderColor: '#D4AF37'
                        },
                        iconTheme: {
                            primary: '#D4AF37',
                            secondary: '#0A1A2F',
                        }
                    }
                }}
            />
            {children}
        </SessionProvider>
    );
}
