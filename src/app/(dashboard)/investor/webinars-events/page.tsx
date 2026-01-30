"use client";

import { useState } from "react";
import "./webinars-events.css";
import AccountInfoCard from "../components/AccountInfoCard";
import SecureMessagingCard from "../components/SecureMessagingCard";
import EventsCalendar from "./components/EventsCalendar";

export default function WebinarEventPage() {

  return (
    <>
        <h1 className="page-title">Webinars & Events</h1>

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

        <EventsCalendar />
    </>
  );
}
