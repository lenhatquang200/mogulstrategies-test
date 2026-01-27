import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import StarsBackground from '@/components/StarsBackground';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Providers } from '@/components/Providers';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Mogul Strategies | Redefining Wealth for Accredited Investors',
  description: 'Mogul Strategies manages a diversified portfolio of innovative funds across equities, digital assets, real estate, technologies, creative arts, and sustainable recycling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <StarsBackground />
          <ParticlesBackground />
          {children}
        </Providers>
      </body>

    </html>
  );
}
