import { landingSEO } from "@/lib/seo";
import "./statergy.css";

export const metadata = landingSEO.strategies;

export default function StrategiesPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Our Investment Strategies</h1>
          <p>
            Sophisticated, diversified approaches blending traditional stability with innovative edges — including Bitcoin integration for enhanced risk mitigation and superior potential returns.
          </p>
        </div>
      </section>

      <section id="core-approach">
        <div className="container">
          <h2 className="section-title">Core Investment Approach</h2>
          <div className="strategy-grid">
            <div className="strategy-card">
              <img
                src="https://thumbs.dreamstime.com/b/stock-market-chart-showing-growing-trends-upward-arrow-bars-illustrating-positive-financial-investment-trading-data-394056257.jpg"
                alt="Portfolio Diversification"
              />
              <h3>Diversification Across Verticals</h3>
              <p>
                We allocate capital across equities, digital assets, real estate, technologies, creative arts, and sustainable recycling — reducing volatility while capturing growth in high-potential sectors.
              </p>
            </div>

            <div className="strategy-card">
              <img
                src="https://www.blockhead.co/content/images/size/w1200/2025/08/blockheadco_digital_lines_and_nodes_and_blockchain_elements_abs_e3a76075-be47-4b4f-8ff5-8a98f0ccc193.webp"
                alt="Bitcoin Integration"
              />
              <h3>Innovative Bitcoin Integration</h3>
              <p>
                Seamlessly blending Bitcoin and blockchain assets with conventional strategies for enhanced portfolio resilience and asymmetric upside potential.
              </p>
            </div>

            <div className="strategy-card">
              <img
                src="https://media.istockphoto.com/id/2161298305/photo/big-data-technology-background.jpg?s=612x612&w=0&k=20&c=khClhyFXpnxIFpeZl3rHjE_m1mLhP_0YEuZmBE1V7ME="
                alt="AI-Driven Insights"
              />
              <h3>AI-Driven Insights & Analytics</h3>
              <p>
                Leveraging artificial intelligence and advanced data analytics to identify opportunities, optimize allocations, and deliver predictive performance modeling.
              </p>
            </div>

            <div className="strategy-card">
              <img
                src="https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.jpg?s=612x612&w=0&k=20&c=AcxzQAe1LY4lGp0C6EQ6reI7ZkFC2ftS09yw_3BVkpk="
                alt="Advanced Risk Management"
              />
              <h3>Advanced Risk Management</h3>
              <p>
                Rigorous assessment, 4-eyes checks, deal-by-deal performance fees, and strategic hedging to protect capital in all market conditions.
              </p>
            </div>

            <div className="strategy-card">
              <img
                src="https://www.elliptic.co/hubfs/75_Global-crypto-regulation-landscape-launch_R%26A-Image.png"
                alt="Sustainable & Ethical Growth"
              />
              <h3>Sustainable & Ethical Growth</h3>
              <p>
                Prioritizing responsible investments with long-term environmental and societal impact, aligned with ESG principles across our funds.
              </p>
            </div>

            <div className="strategy-card">
              <img
                src="https://gabelli.com/wp-content/uploads/2025/10/fifa-4-1024x576.png"
                alt="Exclusive Deal Flow"
              />
              <h3>Exclusive Syndications & Deal Flow</h3>
              <p>
                Providing accredited investors access to proprietary, high-impact private deals and syndications not available on public markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="operational-excellence">
        <div className="container">
          <h2 className="section-title">Operational Excellence & Security</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Secure Compliance</h3>
              <p>
                Strict protocols including role-based access, encryption, multi-factor authentication, and Mogul Custody Solutions.
              </p>
            </div>

            <div className="feature-item">
              <h3>Advanced Tools</h3>
              <p>
                AI-driven insights, automated valuations, customized reporting, and in-depth visualization for transparent performance monitoring.
              </p>
            </div>

            <div className="feature-item">
              <h3>Flexible Structures</h3>
              <p>
                Support for diverse payments (wire, crypto, etc.), performance fees (deal-by-deal or whole fund), and tailored syndications.
              </p>
            </div>

            <div className="feature-item">
              <h3>Investor-Centric</h3>
              <p>
                Exclusive access to high-impact opportunities, personalized support, and seamless portal integration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

