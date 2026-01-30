"use client";

import { useState } from "react";
import "./secure-messaging.css";
import AccountInfoCard from "../components/AccountInfoCard";

export default function SecureMessagingPage() {

  return (
    <>
        <h1 className="page-title">Secure Messaging</h1>

        <section className="top-row">
              <AccountInfoCard
                name="John Doe"
                email="john.doe@example.com"
                investorType="Accredited Individual"
                accountId="MS-INV-4872"
                joined="March 15, 2023"
                lastLogin="December 24, 2025"
            />

            <div className="top-card">
                <h3>Quick Message</h3>
                <p>Send a quick message to your relationship manager.</p>

                <textarea
                    placeholder="Type your message..."
                    style={{
                    width: "100%",
                    height: "100px",
                    padding: "1rem",
                    background: "#0A1A2F",
                    border: "1px solid #D4AF37",
                    borderRadius: "8px",
                    color: "#E0E0E0",
                    marginBottom: "1rem",
                    }}
                />

                <button className="send-btn">Send Message</button>
            </div>

        </section>

        <section className="messaging-container">
            <div className="threads-list">
                <h3>Your Message Threads</h3>
                <div className="thread-item">
                    <div>
                        <div className="thread-subject">Re: Capital Call – Mogul Real Estate Fund</div>
                        <div className="thread-preview">Thank you for the confirmation. The wire has been initiated...</div>
                        <div className="thread-date">December 22, 2025</div>
                    </div>
                    <div className="unread-count">2</div>
                </div>
                <div className="thread-item">
                    <div>
                        <div className="thread-subject">Q4 Distribution Questions</div>
                        <div className="thread-preview">Could you clarify the tax treatment of the recent distribution?</div>
                        <div className="thread-date">December 18, 2025</div>
                    </div>
                </div>
                <div className="thread-item">
                    <div>
                        <div className="thread-subject">Upcoming Webinar Registration</div>
                        <div className="thread-preview">I would like to register for the 2026 Outlook webinar...</div>
                        <div className="thread-date">December 10, 2025</div>
                    </div>
                </div>
                <div className="thread-item">
                    <div>
                        <div className="thread-subject">Document Access Request</div>
                        <div className="thread-preview">Please send the latest PPM for the Technologies Fund.</div>
                        <div className="thread-date">November 28, 2025</div>
                    </div>
                </div>
            </div>

            <div className="compose-section">
                <h3>Compose New Message</h3>
                <form className="compose-form">
                    <div className="form-group">
                        <label htmlFor="recipient">To</label>
                        <input type="text" id="recipient" value="Relationship Manager (Daniel Fainman)" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" placeholder="Enter subject..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit" className="send-btn">Send Secure Message</button>
                </form>
                <p
                    style={{
                        marginTop: "1.5rem",
                        fontSize: "0.9rem",
                        color: "#AAAAAA",
                    }}
                >
                    All messages are encrypted end-to-end and stored securely in compliance with industry standards.
                </p>
            </div>
        </section>
    </>
  );
}
