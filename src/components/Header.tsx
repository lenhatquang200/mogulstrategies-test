'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { status } = useSession();
    const portalLink = status === 'authenticated' ? '/investors/kyc1' : '/login';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="container">
                <nav>
                    <Link href="/" className="logo" onClick={closeMenu}>Mogul Strategies</Link>
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                        <Link href="/" onClick={closeMenu}>Home</Link>
                        <Link href="/about" onClick={closeMenu}>About</Link>
                        <Link href="/strategies" onClick={closeMenu}>Strategies</Link>
                        <Link href="/funds" onClick={closeMenu}>Our Funds</Link>
                        <Link href="/insights" onClick={closeMenu}>Insights</Link>
                        <Link href="/contact" onClick={closeMenu}>Contact</Link>
                        <Link href={portalLink} className="cta-button" onClick={closeMenu}>Investors Portal</Link>

                    </div>
                    <button
                        className="mobile-menu-toggle"
                        id="menuToggle"
                        aria-label="Toggle Navigation"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                    <Link href={portalLink} className="cta-button">Investors Portal</Link>
                </nav>
            </div>
        </header>
    );
}
