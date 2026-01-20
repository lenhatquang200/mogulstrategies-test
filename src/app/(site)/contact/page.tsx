import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <main>
            <section className="hero" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://media.istockphoto.com/id/1344743482/photo/golden-bitcoin-and-various-metal-gears.jpg?s=612x612&w=0&k=20&c=gn1v9L6u8Kk9xzkY2x_7K3z2fE2rQJ4l8g5f7p8v9kM=')`
            }}>
                <div className="container hero-content">
                    <h1>Contact Us</h1>
                    <p>We welcome inquiries from accredited investors, family offices, and institutional partners interested in
                        our diversified alternative investment strategies.</p>
                </div>
            </section>

            <section id="contact">
                <div className="container">
                    <h2 className="section-title">Get in Touch</h2>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Contact Information</h3>
                            <ul>
                                <li><strong>Phone:</strong> <a href="tel:+18007760990">(800) 776-0990</a></li>
                                <li><strong>Email:</strong> <a
                                    href="mailto:info@mogulstrategies.com">info@mogulstrategies.com</a></li>
                                <li><strong>Investor Relations:</strong> <a
                                    href="mailto:ir@mogulstrategies.com">ir@mogulstrategies.com</a></li>
                                <li><strong>Office Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM EST</li>
                                <li><strong>Mailing Address:</strong><br />Mogul Strategies Inc.<br />48 Wall St, Suite 1100<br />New
                                    York, NY 10005<br />United States</li>
                            </ul>
                            <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
                                <strong>Note:</strong> All investments are available exclusively to accredited investors as
                                defined by SEC regulations.
                            </p>
                        </div>

                        <div className="contact-form">
                            <h3>Send Us a Message</h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone (optional)</label>
                                    <input type="tel" id="phone" name="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Inquiry Type *</label>
                                    <select id="type" name="type" required>
                                        <option value="">Select...</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="investment">Investment Opportunities</option>
                                        <option value="portal">Investors Portal Access</option>
                                        <option value="partnership">Partnership / Syndication</option>
                                        <option value="press">Press / Media</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="accredited">Are you an accredited investor? *</label>
                                    <select id="accredited" name="accredited" required>
                                        <option value="">Select...</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                        <option value="institution">Institutional Investor</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea id="message" name="message" required
                                        placeholder="Please provide details about your inquiry..."></textarea>
                                </div>
                                <button type="submit" className="submit-btn" onClick={() => alert('Message sent feature coming soon!')}>Submit Inquiry</button>
                            </form>
                            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#AAAAAA' }}>
                                Your information is secure and will only be used in accordance with our Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="portal-cta">
                <div className="container">
                    <h2>Existing Investors</h2>
                    <p>Registered accredited investors can access fund documents, performance reports, and secure messaging
                        directly through our Investors Portal.</p>
                    <Link href="/login" className="cta-button" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>Enter Investors
                        Portal</Link>
                </div>
            </section>
        </main>
    );
}
