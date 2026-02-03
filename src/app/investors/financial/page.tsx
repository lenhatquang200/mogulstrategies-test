'use client';
import React from 'react';
import Link from 'next/link';
import "./financial.css";

export default function FinancialPage() {
    const dashboardCards = [
  {
    title: "Advice & Planning",
    subtitle: "Personalized financial strategies tailored to your goals",
    actionText: "Start Planning Session",
    actionHref: "#",
    services: [
      {
        icon: "fas fa-chart-line",
        title: "Retirement Planning",
        description: "Maximize tax efficiency and secure your future",
      },
      {
        icon: "fas fa-graduation-cap",
        title: "Education Funding",
        description: "529 plans, trusts, and long-term savings strategies",
      },
      {
        icon: "fas fa-bullseye",
        title: "Goal-Based Planning",
        description: "Home purchase, travel, legacy — we map it all",
      },
    ],
  },
  {
    title: "Investment & Asset Management",
    subtitle: "Professional portfolio construction & management",
    actionText: "View Portfolio",
    actionHref: "#",
    services: [
      {
        icon: "fas fa-chart-pie",
        title: "Portfolio Advisory",
        description:
          "Custom allocation across stocks, bonds, ETFs, alternatives",
      },
      {
        icon: "fas fa-robot",
        title: "Mogul Investor®",
        description: "Automated, low-cost, tax-efficient investing",
      },
      {
        icon: "fas fa-hand-holding-usd",
        title: "Mogul Trading Accounts",
        description: "Full control with commission-free trading",
      },
    ],
  },
  {
    title: "Private Banking & Lending",
    subtitle: "Premium banking and credit solutions",
    actionText: "Explore Lending Options",
    actionHref: "#",
    services: [
      {
        icon: "fas fa-credit-card",
        title: "Premium Credit Lines",
        description: "Securities-backed lending, mortgages, HELOCs",
      },
      {
        icon: "fas fa-wallet",
        title: "Cash Management",
        description: "High-yield accounts, sweep programs",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Wealth Protection",
        description: "Insurance-linked lending solutions",
      },
    ],
  },
  {
    title: "Trust, Business & Specialized",
    subtitle:
      "Fiduciary, estate, business & philanthropy solutions",
    actionText: "Schedule Consultation",
    actionHref: "#",
    services: [
      {
        icon: "fas fa-gavel",
        title: "Trust & Fiduciary",
        description: "Estate planning, trust administration",
      },
      {
        icon: "fas fa-briefcase",
        title: "Business Owner Advisory",
        description:
          "Succession, capital expansion, exit strategies",
      },
      {
        icon: "fas fa-hand-holding-heart",
        title: "Philanthropy & Family Wealth",
        description:
          "Donor-advised funds, legacy planning",
      },
    ],
  },
];

    return (
        <>
        <h1 className="page-title">Mogul Financial AI</h1>
        <p className="tagline text-center">
            Your personal wealth management partner — comprehensive planning, investment strategies, retirement solutions, and fiduciary guidance.
        </p>

        <div className="advisor-container">

            <div className="dashboard-grid financial-page">
                {dashboardCards.map((card) => (
                    <div className="card" key={card.title}>
                    <div className="card-header">
                        <h3 className="card-title">{card.title}</h3>
                        <p className="card-subtitle">{card.subtitle}</p>
                    </div>

                    <div className="card-body">
                        <ul className="service-list">
                        {card.services.map((service) => (
                            <li
                            className="service-item"
                            key={service.title}
                            >
                            <div className="service-icon">
                                <i className={service.icon}></i>
                            </div>

                            <div className="service-text">
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                            </div>
                            </li>
                        ))}
                        </ul>

                        <a
                        href={card.actionHref}
                        className="action-btn"
                        >
                        {card.actionText}
                        </a>
                    </div>
                    </div>
                ))}
            </div>

            <div className="quick-tools">
                <h3>Quick Access Tools</h3>
                <div className="tool-grid">
                <div className="tool-item">
                    <div className="tool-icon"><i className="fas fa-mobile-alt"></i></div>
                    <div className="tool-name">Mobile App</div>
                </div>
                <div className="tool-item">
                    <div className="tool-icon"><i className="fas fa-chart-bar"></i></div>
                    <div className="tool-name">Portfolio Tracker</div>
                </div>
                <div className="tool-item">
                    <div className="tool-icon"><i className="fas fa-file-invoice-dollar"></i></div>
                    <div className="tool-name">Tax Estimator</div>
                </div>
                <div className="tool-item">
                    <div className="tool-icon"><i className="fas fa-calculator"></i></div>
                    <div className="tool-name">Retirement Calculator</div>
                </div>
                </div>
            </div>

        </div>
        </>
    );
}
