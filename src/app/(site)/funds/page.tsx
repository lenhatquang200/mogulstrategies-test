import React from 'react';
import Link from 'next/link';
import { landingSEO } from "@/lib/seo";
import AccessPortalLink from '@/components/AccessPortalLink';

export const metadata = landingSEO.funds;
export default function FundsPage() {
    return (
        <main>
            <section className="hero" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://media.istockphoto.com/id/1344743482/photo/golden-bitcoin-and-various-metal-gears.jpg?s=612x612&w=0&k=20&c=gn1v9L6u8Kk9xzkY2x_7K3z2fE2rQJ4l8g5f7p8v9kM=')`
            }}>
                <div className="container hero-content">
                    <h1>Our Portfolio of Funds</h1>
                    <p>A carefully curated collection of specialized investment vehicles designed to capture growth across
                        traditional and emerging verticals — exclusively for accredited and institutional investors.</p>
                    <AccessPortalLink className="cta-button" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                        Access Investors Portal
                    </AccessPortalLink>
                </div>
            </section>

            <section id="funds">
                <div className="container">
                    <h2 className="section-title">Explore Our Funds</h2>
                    <div className="funds-grid">
                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="https://media.istockphoto.com/id/1846625096/photo/gold-candlestick-financial-stock-investment-exchange-business-market-money-finance-indicator.jpg?s=612x612&w=0&k=20&c=uTuuwjh4MD50bR_pWl1hpq9kJaqkIA8apSTB5VvlLRM="
                                    alt="Mogul Equities Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Mogul Equities</h3>
                                    <p>Focused on publicly traded securities and collateralized strategies, delivering steady growth
                                        and income through rigorously selected opportunities in global markets.</p>
                                </div>
                                <a href="https://mogulequities.com" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More →</a>
                            </div>
                        </div>

                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="/imgs/mogul_digital_found.png"
                                    alt="Mogul Digital Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Mogul Digital Fund</h3>
                                    <p>Deep investments in blockchain infrastructure, digital assets, and Bitcoin-backed strategies
                                        — positioned for asymmetric upside in the evolving digital economy.</p>
                                </div>
                                <a href="https://moguldigitalfund.com" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More →</a>
                            </div>
                        </div>

                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iaDP_g8sTr8A/v2/1200x805.jpg"
                                    alt="Mogul Real Estate Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Mogul Real Estate</h3>
                                    <p>Premium income-producing properties in high-growth Gulf regions, offering stable cash flow
                                        and capital appreciation through carefully vetted real estate syndications.</p>
                                </div>
                                <a href="https://mogul.realestate" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More →</a>
                            </div>
                        </div>

                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="https://png.pngtree.com/background/20250107/original/pngtree-cutting-edge-quantum-computing-futuristic-blue-circuit-board-texture-background-illustrating-picture-image_15235743.jpg"
                                    alt="Mogul Technologies Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Mogul Technologies</h3>
                                    <p>High-conviction investments in AI, quantum computing, and transformative technologies driving
                                        the next wave of industrial and consumer innovation.</p>
                                </div>
                                <a href="https://mogultechnologies.io" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More →</a>
                            </div>
                        </div>

                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="https://static.boredpanda.com/blog/wp-content/uploads/2019/07/behind-the-scenes-of-hollywood-movies-1-5d1b13d220dfa__700.jpg"
                                    alt="Creative Arts Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Creative Arts Fund</h3>
                                    <p>Strategic investments in motion picture production, entertainment IP, and cultural assets —
                                        blending creativity with attractive risk-adjusted returns.</p>
                                </div>
                                <a href="https://creativeartsfund.com" className="learn-more" target="_blank" rel="noopener noreferrer">Learn More →</a>
                            </div>
                        </div>

                        <div className="fund-card">
                            <div className="fund-img">
                                <img src="https://thumbs.dreamstime.com/b/clean-modern-recycling-center-automated-machinery-organized-waste-sorting-high-tech-industrial-recycling-center-420985238.jpg"
                                    alt="Mogul Recycling Fund" />
                            </div>
                            <div className="fund-content">
                                <div>
                                    <h3>Mogul Recycling Fund</h3>
                                    <p>Sustainable infrastructure investments in advanced waste management, recycling technologies,
                                        and circular economy initiatives for long-term environmental and financial impact.</p>
                                </div>
                                <a href="#" className="learn-more">Learn More →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="portal-cta">
                <div className="container">
                    <h2>Ready to Invest?</h2>
                    <p>Access detailed fund documents, performance data, and subscription materials through our secure investor
                        portal. Available exclusively to accredited and institutional investors.</p>
                    <Link href="/login" className="cta-button" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>Enter Investors
                        Portal</Link>
                </div>
            </section>
        </main>
    );
}
