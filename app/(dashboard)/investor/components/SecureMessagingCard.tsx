"use client";

import { useState } from "react";

export default function SecureMessagingCard() {
  const [message, setMessage] = useState("");

  return (
    <div className="top-card messaging-card">
      <h3>Secure Messaging</h3>
      <p>Communicate directly with your relationship manager.</p>

      <a
        href="#"
        style={{
          display: "block",
          margin: "1rem 0",
          fontWeight: "bold",
        }}
      >
        Open Inbox (2 unread)
      </a>

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          padding: "1rem",
          background: "#0A1A2F",
          border: "1px solid #D4AF37",
          borderRadius: "8px",
          color: "#E0E0E0",
          resize: "none",
        }}
      />

      <button
        onClick={() => {
          // TODO: integrate API
          console.log("Message sent:", message);
          setMessage("");
        }}
        style={{
          marginTop: "1rem",
          background: "#D4AF37",
          color: "#0A1A2F",
          padding: "0.8rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Send Message
      </button>
    </div>
  );
}
