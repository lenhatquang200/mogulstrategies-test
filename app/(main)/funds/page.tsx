import { funds } from "@/data/funds";
import { landingSEO } from "@/lib/seo";
import "./funds.css";

export const metadata = landingSEO.funds;

export default function FundsPage() {
  return (
    <>
    <section className="hero">
        <div className="container hero-content">
          <h1>Our Portfolio of Funds</h1>
          <p>
            A carefully curated collection of specialized investment vehicles designed to capture growth across traditional and emerging verticals — exclusively for accredited and institutional investors.
          </p>
          <a href="login.html" className="cta-button">
            Access Investors Portal
          </a>
        </div>
      </section>

      <section id="funds">
        <div className="container">
          <h2 className="section-title">Explore Our Funds</h2>
          <div className="funds-grid">
            
            {funds.map((fund) => (
              <div className="fund-card" key={fund.id}>
                <div className="fund-img">
                  <img src={fund.image} alt={fund.alt} />
                </div>

                <div className="fund-content">
                  <h3>{fund.name}</h3>
                  <p>{fund.description}</p>
                  <a href={fund.link} className="learn-more">
                    Learn More →
                  </a>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="portal-cta">
        <div className="container">
          <h2>Ready to Invest?</h2>
          <p>
            Access detailed fund documents, performance data, and subscription materials through our secure investor portal. Available exclusively to accredited and institutional investors.
          </p>
          <a
            href="login.html"
            className="cta-button"
            style={{ fontSize: "1.2rem", padding: "1rem 3rem" }}
          >
            Enter Investors Portal
          </a>
        </div>
      </section>
    </>
  );
}

