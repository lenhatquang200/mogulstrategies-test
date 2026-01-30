"use client";

import { funds } from "@/data/funds";
import Image from "next/image";

export default function FundsSection() {
    return (

        <section id="funds">
            <div className="container">
            <h2 className="section-title">Our Funds</h2>
            <div className="funds-grid">

                {funds.map((fund) => {
                    const isExternal = fund.image.startsWith("http");

                    return (
                    <div className="fund-card" key={fund.name}>
                        <Image
                            src={fund.image}
                            alt={fund.alt}
                            width={600}
                            height={400}
                            className="fund-image"
                            unoptimized={isExternal}
                        />

                        <div className="fund-card-content">
                            <h3>{fund.name}</h3>
                            <p>{fund.short_description}</p>
                            <a
                                href={fund.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn More →
                            </a>
                        </div>
                    </div>
                    );
                })}

            </div>
            </div>
        </section>
    );
}
