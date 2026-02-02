import React from 'react';
import Link from 'next/link';
import { landingSEO } from "@/lib/seo";

export const metadata = landingSEO.insights;

export default function InsightsPage() {
    const insights = [
        {
            date: "December 24, 2025",
            title: "Bitcoin as the Ultimate Portfolio Hedge in 2026",
            description: "Updated analysis on Bitcoin's correlation dynamics and its role in reducing portfolio volatility amid rising geopolitical risks.",
            image: "/imgs/unnamed.jpg"
        },
        {
            date: "December 15, 2025",
            title: "2026 Alternative Investments Outlook",
            description: "Macro trends and opportunities across digital assets, real estate, AI technologies, and sustainable infrastructure.",
            image: "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.jpg?s=612x612&w=0&k=20&c=AcxzQAe1LY4lGp0C6EQ6reI7ZkFC2ftS09yw_3BVkpk="
        },
        {
            date: "November 28, 2025",
            title: "Circular Economy Investments: Beyond Recycling",
            description: "How advanced waste management and material recovery are generating alpha in sustainable private markets.",
            image: "https://media.istockphoto.com/id/2088213687/photo/green-business-growth-sustainable-investment-finance-esg-funds-or-sustainability-funds-a-tree.jpg?s=612x612&w=0&k=20&c=2bSx7cvsM-UNGYsvn3dp9ImjBbbBffs4nEA3CbxnDlA="
        },
        {
            date: "November 10, 2025",
            title: "AI-Driven Alpha Generation in Private Markets",
            description: "Case studies on predictive analytics transforming due diligence and deal sourcing in technology funds.",
            image: "https://media.istockphoto.com/id/2161298305/photo/big-data-technology-background.jpg?s=612x612&w=0&k=20&c=khClhyFXpnxIFpeZl3rHjE_m1mLhP_0YEuZmBE1V7ME="
        },
        {
            date: "October 22, 2025",
            title: "Gulf Region Real Estate: Resilience & Yield in 2025",
            description: "Why premium income-producing properties continue to deliver stable returns amid global uncertainty.",
            image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iaDP_g8sTr8A/v2/1200x805.jpg"
        },
        {
            date: "October 8, 2025",
            title: "Entertainment IP as an Alternative Asset Class",
            description: "The growing role of motion picture financing and content funds in diversified portfolios.",
            image: "https://static.boredpanda.com/blog/wp-content/uploads/2019/07/behind-the-scenes-of-hollywood-movies-1-5d1b13d220dfa__700.jpg"
        }
    ];

    return (
        <main>
            <section className="hero" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://media.istockphoto.com/id/1314145224/photo/businessman-analyzing-data-on-laptop.jpg?s=612x612&w=0&k=20&c=3fZ7pZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9v=')`
            }}>
                <div className="container hero-content">
                    <h1>Insights & Thought Leadership</h1>
                    <p>Exclusive perspectives on alternative investments, market trends, Bitcoin's role in portfolios, fund
                        analytics, and emerging opportunities across our specialized verticals.</p>
                </div>
            </section>

            <section id="analytics">
                <div className="container">
                    <h2 className="section-title">Portfolio Analytics Overview</h2>
                    <p style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
                        High-level aggregated statistics across our diversified fund portfolio as of December 2025. Detailed
                        performance data available in the secure Investors Portal.
                    </p>
                    <div className="analytics-grid">
                        <div className="analytic-card">
                            <h3>$45M+</h3>
                            <p>Total Assets Under Management</p>
                        </div>
                        <div className="analytic-card">
                            <h3>18.4%</h3>
                            <p>Annualized Return (Net) Since Inception</p>
                        </div>
                        <div className="analytic-card">
                            <h3>1.72</h3>
                            <p>Sharpe Ratio</p>
                        </div>
                        <div className="analytic-card">
                            <h3>9.2%</h3>
                            <p>Maximum Drawdown</p>
                        </div>
                        <div className="analytic-card">
                            <h3>6</h3>
                            <p>Active Specialized Funds</p>
                        </div>
                        <div className="analytic-card">
                            <h3>142</h3>
                            <p>Portfolio Holdings</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="insights">
                <div className="container">
                    <h2 className="section-title">Latest Insights</h2>
                    <div className="insights-grid">
                        {insights.map((insight, idx) => (
                            <div key={idx} className="insight-card">
                                <div className="insight-img">
                                    <img src={insight.image} alt={insight.title} />
                                </div>
                                <div className="insight-content">
                                    <div className="date">{insight.date}</div>
                                    <h3>{insight.title}</h3>
                                    <p>{insight.description}</p>
                                    <Link href="#">Read More →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="resources">
                <div className="container">
                    <h2 className="section-title">Investor Resources</h2>
                    <div className="resources-grid">
                        <div className="resource-item">
                            <h3>Quarterly Market Commentary</h3>
                            <p>In-depth analysis of macroeconomic trends and implications for our funds.</p>
                            <Link href="/login" className="cta-button"
                                style={{ display: 'inline-block', marginTop: '1rem', padding: '0.8rem 1.8rem' }}>Access in Portal →</Link>
                        </div>
                        <div className="resource-item">
                            <h3>Fund Performance Reports</h3>
                            <p>Monthly and quarterly returns, attribution, and manager commentary.</p>
                            <Link href="/login" className="cta-button"
                                style={{ display: 'inline-block', marginTop: '1rem', padding: '0.8rem 1.8rem' }}>Access in Portal →</Link>
                        </div>
                        <div className="resource-item">
                            <h3>White Papers & Research</h3>
                            <p>Deep dives into Bitcoin hedging, sustainable infrastructure, and private market dynamics.</p>
                            <Link href="/login" className="cta-button"
                                style={{ display: 'inline-block', marginTop: '1rem', padding: '0.8rem 1.8rem' }}>Access in Portal →</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="portal-cta">
                <div className="container">
                    <h2>Access Exclusive Content & Analytics</h2>
                    <p>Registered accredited investors gain full access to detailed fund performance, gated insights, webinars,
                        and subscription documents through our secure portal.</p>
                    <Link href="/login" className="cta-button" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>Enter Investors
                        Portal</Link>
                </div>
            </section>
        </main>
    );
}
