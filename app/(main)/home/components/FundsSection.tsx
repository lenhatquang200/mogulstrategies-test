"use client";

import { funds } from "@/data/funds";

export default function FundsSection() {
    return (

        <section id="funds">
            <div className="container">
            <h2 className="section-title">Our Funds</h2>
            <div className="funds-grid">
                {funds.map((fund) => (
                <div className="fund-card" key={fund.name}>
                    <img src={fund.image} alt={fund.alt} />

                    <div className="fund-card-content">
                    <h3>{fund.name}</h3>
                    <p>{fund.short_description}</p>
                    <a href={fund.link} target="_blank" rel="noopener noreferrer">
                        Learn More →
                    </a>
                    </div>
                </div>
                ))}

            </div>
            </div>
        </section>
    );
}
