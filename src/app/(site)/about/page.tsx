import React from 'react';

export default function AboutPage() {
    return (
        <main>
            <section className="hero" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://static.vecteezy.com/system/resources/previews/065/273/911/large_2x/team-of-diversity-business-person-are-discussing-over-the-new-strategic-strategy-project-on-investment-real-estate-while-working-in-modern-office-building-for-new-project-and-planning-photo.jpg')`
            }}>
                <div className="container hero-content">
                    <h1>About Mogul Strategies</h1>
                    <p>Where visionary thinking intersects with unparalleled integrity – pioneering innovative, ethically
                        grounded investment solutions for accredited and institutional investors.</p>
                </div>
            </section>

            <section id="mission">
                <div className="container">
                    <h2 className="section-title">Our Mission & Vision</h2>
                    <p className="mission">
                        Founded to redefine industry benchmarks, Mogul Strategies is a passionate team dedicated to making
                        impactful changes. Our expertise spans digital assets, creative arts, equities, technologies, real
                        estate, and sustainable recycling – delivering solutions that are both innovative and ethically
                        grounded. We pride ourselves on a client-focused approach, crafting bespoke strategies that align
                        perfectly with each investor's unique objectives. Our relentless pursuit of excellence ensures we remain
                        leaders in creating enduring value.
                    </p>
                </div>
            </section>

            <section id="values">
                <div className="container">
                    <h2 className="section-title">Core Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Integrity</h3>
                            <p>We uphold the highest ethical standards in every decision and transaction, building trust that
                                lasts beyond market cycles.</p>
                        </div>
                        <div className="value-card">
                            <h3>Innovation</h3>
                            <p>We embrace forward-thinking strategies, integrating cutting-edge opportunities like Bitcoin and
                                emerging technologies to stay ahead of the curve.</p>
                        </div>
                        <div className="value-card">
                            <h3>Excellence</h3>
                            <p>We pursue superior risk-adjusted returns through rigorous analysis, disciplined execution, and
                                continuous improvement.</p>
                        </div>
                        <div className="value-card">
                            <h3>Client-Centricity</h3>
                            <p>Every strategy is tailored to our investors’ goals, with transparent communication and
                                personalized service at the forefront.</p>
                        </div>
                        <div className="value-card">
                            <h3>Sustainability</h3>
                            <p>We invest responsibly, balancing financial performance with long-term environmental and societal
                                impact across all verticals.</p>
                        </div>
                        <div className="value-card">
                            <h3>Diversity & Inclusion</h3>
                            <p>We foster diverse perspectives within our team and portfolio, driving creativity and better
                                outcomes for all stakeholders.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="leadership">
                <div className="container">
                    <h2 className="section-title">Leadership</h2>
                    <div className="leadership">
                        <div className="leader-img">
                            <img src="https://thumbs.dreamstime.com/b/handsome-stylish-modern-african-american-business-man-entrepreneur-executive-sitting-outside-office-cheerful-smile-155856257.jpg"
                                alt="Daniel Fainman, General Partner" />
                        </div>
                        <div className="leader-bio">
                            <h3>Daniel Fainman</h3>
                            <p><strong>General Partner</strong></p>
                            <p>Daniel Fainman brings a dynamic blend of financial expertise, entrepreneurial vision, and
                                creative leadership to Mogul Strategies. As General Partner, he oversees a diversified portfolio
                                of funds, driving innovation across equities, digital assets, real estate, technologies,
                                creative arts, and sustainable ventures.</p>
                            <p>With a proven track record in fund management, capital raising, and strategic execution, Daniel
                                is committed to delivering exceptional risk-adjusted returns while advancing industry
                                breakthroughs. His multifaceted background in finance, technology, and entertainment ensures
                                Mogul Strategies remains at the forefront of alternative investments.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="team">
                <div className="container">
                    <h2 className="section-title">Our Team</h2>
                    <div className="team-img" style={{ textAlign: 'center', margin: '6rem 0' }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/068/589/780/large_2x/team-of-diversity-business-people-are-discussing-over-new-strategic-strategy-project-on-investment-real-estate-while-working-in-modern-office-building-for-new-project-and-planning-photo.jpg"
                            alt="Diverse Mogul Strategies Investment Team" style={{ borderRadius: '12px', maxWidth: '100%' }} />
                    </div>
                    <p style={{ textAlign: 'center', maxWidth: '900px', margin: '2rem auto', fontSize: '1.2rem' }}>
                        Backed by 36 qualified experts with over 45 years of combined experience, our team combines deep
                        industry knowledge with cutting-edge insights to deliver superior outcomes for our investors.
                    </p>
                </div>
            </section>

            <section id="milestones">
                <div className="container">
                    <h2 className="section-title">Key Milestones</h2>
                    <div className="milestones">
                        <div className="milestone-card">
                            <h4>Foundation & Vision</h4>
                            <p>Established with a mission to blend traditional finance with innovative edges, including Bitcoin
                                integration for risk mitigation.</p>
                        </div>
                        <div className="milestone-card">
                            <h4>$45M AUM Achieved</h4>
                            <p>Rapid growth managing diversified funds across multiple high-potential verticals.</p>
                        </div>
                        <div className="milestone-card">
                            <h4>Portfolio Expansion</h4>
                            <p>Launched specialized funds in digital assets, real estate, technologies, creative arts, and
                                sustainable recycling.</p>
                        </div>
                        <div className="milestone-card">
                            <h4>Global Partnerships</h4>
                            <p>Built 9 international partnerships and welcomed 20+ new clients annually.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>$45M</h3>
                            <p>Assets Under Management</p>
                        </div>
                        <div className="stat-item">
                            <h3>45+</h3>
                            <p>Years Combined Experience</p>
                        </div>
                        <div className="stat-item">
                            <h3>36</h3>
                            <p>Qualified Experts</p>
                        </div>
                        <div className="stat-item">
                            <h3>20+</h3>
                            <p>New Clients Every Year</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
