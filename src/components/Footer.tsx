import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2025 Mogul Strategies Inc. For Accredited Investors Only.</p>
                <p>Call us: <a href="tel:+18007760990">(800) 776-0990</a> | <Link href="/login">Investors Portal</Link></p>
                <p><small>Investments involve risk. Past performance is not indicative of future results.</small></p>
            </div>
        </footer>
    );
}
