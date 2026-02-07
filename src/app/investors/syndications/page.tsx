"use client"
import SyndicationCard from "./components/SyndicationCard"
import "./syndication.css";

export const syndications = [
  {
    id: "multifamily-houston",
    title: "123 Main Multifamily – Houston, TX",
    subtitle: "Class A Value-Add • 248 Units • Traditional Cash Syndication",
    status: "Open – First Close Feb 28, 2026",
    typeBadge: "Subscription",

    raise: {
      min: "$8.5M",
      target: "$18.2M",
      committed: "$11.3M",
      progressPercent: 62,
    },

    terms: [
      { label: "Management Fee", value: "1.5%" },
      { label: "Performance Fee", value: "20% above pref" },
      { label: "Acquisition Fee", value: "2%" },
      { label: "Min Investment", value: "$100,000", highlight: true },
      { label: "Pref Return", value: "8% compounded" },
      { label: "Projected IRR", value: "16–21%", highlight: true },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },

  {
    id: "miami-condo-tokenized",
    title: "Miami Beach Condo Tower – Tokenized",
    subtitle: "Luxury Condo RWA • Fractional Ownership on Polygon",
    status: "Open – Token Sale Ongoing",
    typeBadge: "Tokens",

    raise: {
      min: "$4.2M",
      target: "$12.8M",
      committed: "$10.0M tokenized",
      progressPercent: 78,
    },

    terms: [
      { label: "Management Fee", value: "1.25%" },
      { label: "Performance Fee", value: "15% above hurdle" },
      { label: "Platform Fee", value: "0.5%" },
      { label: "Min Token Purchase", value: "$5,000", highlight: true },
      { label: "Yield (Rental)", value: "9.2–11.8% APY" },
      { label: "Projected IRR", value: "18–24%", highlight: true },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },

  {
    id: "stablecoin-yield-vault",
    title: "Stablecoin Yield Vault – DeFi Syndication",
    subtitle: "USDC/USDT lending & delta-neutral strategies",
    status: "Open – Rolling Subscriptions",
    typeBadge: "Liquidity Yield",

    raise: {
      min: "$3M",
      target: "$25M",
      committed: "$10.3M",
      progressPercent: 41,
    },

    terms: [
      { label: "Management Fee", value: "1.5%" },
      { label: "Performance Fee", value: "20% above 10%" },
      { label: "Min Commitment", value: "$50,000", highlight: true },
      { label: "Lock-up", value: "90 days" },
      { label: "Target APY", value: "12–18%" },
      { label: "Redemption", value: "Monthly" },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },

  {
    id: "senior-bridge-loan",
    title: "Senior Debt Bridge Loan – Commercial Property",
    subtitle: "Short-term bridge financing • Office building refinance",
    status: "Open – Commitments Accepted",
    typeBadge: "Debt",

    raise: {
      min: "$5.0M",
      target: "$12.0M",
      committed: "$8.2M",
      progressPercent: 68,
    },

    terms: [
      { label: "Interest Rate", value: "11.5% fixed" },
      { label: "Management Fee", value: "1.0%" },
      { label: "Origination Fee", value: "2.0%" },
      { label: "Min Commitment", value: "$250,000", highlight: true },
      { label: "Term", value: "12–18 months" },
      { label: "Collateral", value: "First lien mortgage" },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },

  {
    id: "mezzanine-hotel-debt",
    title: "Mezzanine Debt – Hotel Development",
    subtitle: "Boutique hotel ground-up • Miami Beach",
    status: "Open – Final Commitments",
    typeBadge: "Mezzanine Debt",

    raise: {
      min: "$7.5M",
      target: "$15.0M",
      committed: "$8.3M",
      progressPercent: 55,
    },

    terms: [
      { label: "Interest Rate", value: "13.0% PIK" },
      { label: "Management Fee", value: "1.75%" },
      { label: "Equity Kicker", value: "15% participation" },
      { label: "Min Commitment", value: "$500,000", highlight: true },
      { label: "Term", value: "36 months" },
      { label: "Collateral", value: "Second lien" },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },

  {
    id: "convertible-note-tech",
    title: "Convertible Note Round – Early-Stage Tech",
    subtitle: "AI SaaS startup • Seed extension",
    status: "Open – Closing Soon",
    typeBadge: "Convertible Debt",

    raise: {
      min: "$1.8M",
      target: "$4.5M",
      committed: "$3.7M",
      progressPercent: 82,
    },

    terms: [
      { label: "Discount Rate", value: "20%" },
      { label: "Valuation Cap", value: "$18M" },
      { label: "Interest Rate", value: "6% simple" },
      { label: "Min Investment", value: "$50,000", highlight: true },
      { label: "Maturity", value: "18 months" },
      { label: "Conversion Trigger", value: "Qualified financing" },
    ],

    actions: [
        { key: "deck", label: "View Deck" },
        { key: "ppm", label: "Review PPM" },
        { key: "subscribe", label: "Subscribe" },
        { key: "wire", label: "Wire Instructions" },
        { key: "deposit", label: "Deposit Funds" },
        { key: "activity", label: "Activity" },
    ]
  },
]


export default function HomePage() {
  return (
    <>
        <h1 className="page-title">Syndications</h1>

        <p style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
            Exclusive single-asset SPV syndications offering direct exposure to proprietary deal flow outside of our structured funds.
        </p>

        <div className="container">
            {syndications.map((deal, i) => (
                <SyndicationCard key={i} deal={deal} />
            ))}
        </div>
    </>
    
  )
}
