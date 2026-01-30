"use client";

import { useState } from "react";
import "./support-faq.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";
import FaqSection from "./components/FaqSection";

export default function SupportFaqPage() {

  return (
    <>
        <h1 className="page-title">Support & FAQ</h1>

        <section className="top-row">
              <AccountInfoCard
                name="John Doe"
                email="john.doe@example.com"
                investorType="Accredited Individual"
                accountId="MS-INV-4872"
                joined="March 15, 2023"
                lastLogin="December 24, 2025"
            />

            <SecureMessagingCard />
        </section>

        <FaqSection />

        <section className="support-contact">
            <h3>Need Additional Help?</h3>
            <p>Our investor support team is available Monday–Friday, 9:00 AM–6:00 PM EST.</p>
            <p><strong>Email:</strong> <a href="mailto:support@mogulstrategies.com">support@mogulstrategies.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+18007760990">(800) 776-0990</a></p>
            <button className="contact-btn">Open Secure Message</button>
        </section>
    </>
  );
}
