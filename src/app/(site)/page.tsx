'use client';
import Link from 'next/link';
import VideoSlider from '@/components/VideoSlider';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Redefining Wealth Acceleration</h1>
          <p>Diversified portfolios blending proven strategies with innovative edges — including Bitcoin integration
            for enhanced risk mitigation. Exclusive opportunities for accredited and institutional investors.</p>
          <div className="hero-buttons">
            <Link href="/funds" className="cta-button">Explore Our Funds</Link>
            <Link href="/login" className="cta-button cta-outline">Access Portal</Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSlider />

      {/* Stats Section */}
      <section id="stats">
        <div className="container">
          <h2 className="section-title">Why Mogul Strategies?</h2>
          <div className="stats">
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

      {/* Funds Section */}
      <section id="funds">
        <div className="container">
          <h2 className="section-title">Our Funds</h2>
          <div className="funds-grid">
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://media.istockphoto.com/id/1846625096/photo/gold-candlestick-financial-stock-investment-exchange-business-market-money-finance-indicator.jpg?s=612x612&w=0&k=20&c=uTuuwjh4MD50bR_pWl1hpq9kJaqkIA8apSTB5VvlLRM="
                  alt="Mogul Equities - Gold Candlestick Chart" />
              </div>
              <div className="fund-content">
                <h3>Mogul Equities</h3>
                <p>Securities and collateralized strategies for steady growth.</p>
                <a href="https://mogulequities.com" className="learn-more">Learn More →</a>
              </div>
            </div>
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://thumbs.dreamstime.com/z/cryptocurrency-revolution-visualization-digital-realm-graphic-art-futuristic-environment-abstract-concept-explore-vibrant-351927303.jpg"
                  alt="Mogul Digital Fund - Futuristic Blockchain Visualization" />
              </div>
              <div className="fund-content">
                <h3>Mogul Digital Fund</h3>
                <p>Blockchain and deep digital assets with Bitcoin integration.</p>
                <a href="https://moguldigitalfund.com" className="learn-more">Learn More →</a>
              </div>
            </div>
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iaDP_g8sTr8A/v2/1200x805.jpg"
                  alt="Mogul Real Estate - Luxury Dubai Villa" />
              </div>
              <div className="fund-content">
                <h3>Mogul Real Estate</h3>
                <p>Income-producing properties in premium Gulf regions.</p>
                <a href="https://mogul.realestate" className="learn-more">Learn More →</a>
              </div>
            </div>
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://png.pngtree.com/background/20250107/original/pngtree-cutting-edge-quantum-computing-futuristic-blue-circuit-board-texture-background-illustrating-picture-image_15235743.jpg"
                  alt="Mogul Technologies - Futuristic AI Circuit" />
              </div>
              <div className="fund-content">
                <h3>Mogul Technologies</h3>
                <p>High-tech and AI-driven innovations.</p>
                <a href="https://mogultechnologies.io" className="learn-more">Learn More →</a>
              </div>
            </div>
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://static.boredpanda.com/blog/wp-content/uploads/2019/07/behind-the-scenes-of-hollywood-movies-1-5d1b13d220dfa__700.jpg"
                  alt="Creative Arts Fund - Hollywood Film Set Behind the Scenes" />
              </div>
              <div className="fund-content">
                <h3>Creative Arts Fund</h3>
                <p>Investments in entertainment, motion picture production, and cultural opportunities.</p>
                <a href="https://creativeartsfund.com" className="learn-more">Learn More →</a>
              </div>
            </div>
            <div className="fund-card">
              <div className="fund-img">
                <img src="https://thumbs.dreamstime.com/b/clean-modern-recycling-center-automated-machinery-organized-waste-sorting-high-tech-industrial-recycling-center-420985238.jpg"
                  alt="Mogul Recycling Fund - Modern Recycling Facility" />
              </div>
              <div className="fund-content">
                <h3>Mogul Recycling Fund</h3>
                <p>Sustainable investments in waste management, recycling technologies, and eco-friendly
                  infrastructure.</p>
                <a href="#" className="learn-more">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
