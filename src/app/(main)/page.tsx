import { landingSEO } from "@/lib/seo";
import "./home/home.css";
import HomeVideo from "./home/components/HomeVideo";
import StatsSection from "./home/components/StatsSection";
import FundsSection from "./home/components/FundsSection";

export const metadata = landingSEO.home;
export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Redefining Wealth Acceleration</h1>
          <p>
            Diversified portfolios blending proven strategies with innovative
            edges — including Bitcoin integration for enhanced risk mitigation.
            Exclusive opportunities for accredited and institutional investors.
          </p>
          <div className="hero-buttons">
            <a href="/funds" className="cta-button">
              Explore Our Funds
            </a>
            <a href="/login" className="cta-button cta-outline">
              Access Portal
            </a>
          </div>
        </div>
      </section>

      <HomeVideo />

      <StatsSection />

      <FundsSection />

    </>
  );
}
