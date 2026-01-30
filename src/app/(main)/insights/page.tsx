import { insights } from "@/data/insights";
import { landingSEO } from "@/lib/seo";
import Image from "next/image";
import "./insight.css";

export const metadata = landingSEO.insights;

export default function InsightsPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Insights & Thought Leadership</h1>
          <p>
            Exclusive perspectives on alternative investments, market trends, Bitcoin's role in portfolios, fund analytics, and emerging opportunities across our specialized verticals.
          </p>
        </div>
      </section>

      <section id="analytics">
        <div className="container">
          <h2 className="section-title">Portfolio Analytics Overview</h2>
          <p
            style={{
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto 4rem",
              fontSize: "1.2rem",
            }}
          >
            High-level aggregated statistics across our diversified fund portfolio as of December 2025. Detailed performance data available in the secure Investors Portal.
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
            {insights.map((insight) => {
              const isExternal = insight.image.startsWith("http");

              return (
                <div className="insight-card" key={insight.id}>
                  <div className="insight-img">
                    <Image
                      src={insight.image}
                      alt={insight.alt}
                      width={600}
                      height={400}
                      className="fund-image"
                      unoptimized={isExternal}
                    />
                  </div>

                  <div className="insight-content">
                    <div className="date">{insight.date}</div>
                    <h3>{insight.title}</h3>
                    <p>{insight.excerpt}</p>
                    <a href={insight.link}>Read More →</a>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      <section id="resources">
        <div className="container">
          <h2 className="section-title">Investor Resources</h2>
          <div className="resources-grid">
            <div className="resource-item">
              <h3>Quarterly Market Commentary</h3>
              <p>
                In-depth analysis of macroeconomic trends and implications for our funds.
              </p>
              <a
                href="login.html"
                className="cta-button"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.8rem 1.8rem",
                }}
              >
                Access in Portal →
              </a>
            </div>

            <div className="resource-item">
              <h3>Fund Performance Reports</h3>
              <p>
                Monthly and quarterly returns, attribution, and manager commentary.
              </p>
              <a
                href="login.html"
                className="cta-button"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.8rem 1.8rem",
                }}
              >
                Access in Portal →
              </a>
            </div>

            <div className="resource-item">
              <h3>White Papers & Research</h3>
              <p>
                Deep dives into Bitcoin hedging, sustainable infrastructure, and private market dynamics.
              </p>
              <a
                href="login.html"
                className="cta-button"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.8rem 1.8rem",
                }}
              >
                Access in Portal →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-cta">
        <div className="container">
          <h2>Access Exclusive Content & Analytics</h2>
          <p>
            Registered accredited investors gain full access to detailed fund performance, gated insights, webinars, and subscription documents through our secure portal.
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

