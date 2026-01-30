import Link from 'next/link';
import { landingSEO } from "@/lib/seo";
import ContactForm from "./components/ContactForm";
import "./contact.css";

export const metadata = landingSEO.contact;
export default function ContactPage() {
  
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Contact Us</h1>
          <p>
            We welcome inquiries from accredited investors, family offices, and
            institutional partners interested in our diversified alternative
            investment strategies.
          </p>
        </div>
      </section>

      <ContactForm />

      <section className="portal-cta">
        <div className="container">
          <h2>Existing Investors</h2>
          <p>
            Registered accredited investors can access fund documents,
            performance reports, and secure messaging directly through our
            Investors Portal.
          </p>
          <Link
            href="/login"
            className="cta-button"
            style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
          >
            Enter Investors Portal
          </Link>
        </div>
      </section>

    </>
  );
}
