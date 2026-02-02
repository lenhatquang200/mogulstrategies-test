import Link from 'next/link';
import AccessPortalLink from '@/components/AccessPortalLink';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2025 Mogul Strategies Inc. For Accredited Investors Only.</p>
                <p>Call us: <a href="tel:+18007760990">(800) 776-0990</a> | <AccessPortalLink  className="cursor-pointer">Investors Portal</AccessPortalLink>
                </p>
                <p><small>Investments involve risk. Past performance is not indicative of future results.</small></p>
            </div>
        </footer>
    );
}
