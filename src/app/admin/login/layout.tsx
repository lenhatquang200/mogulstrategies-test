import { ReactNode } from 'react';

export default function AdminLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#0a192f',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
