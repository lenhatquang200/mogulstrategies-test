"use client";

import { useEffect, useRef } from "react";

export default function HomeVideo() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const playlist = [
      "117wMHEQTEIa1gcbiyJu3po9nXkyWICwH",
      "1zVH9LXRe2-5nVuCkMfPcUQLwaImqKQhz",
      "1E3QhY8HcdOXDCHAd_j7RX66h2ft8QRk5",
    ];

    const iframe = iframeRef.current;
    if (!iframe) return;

    const randomIndex = Math.floor(Math.random() * playlist.length);
    const videoId = playlist[randomIndex];

    iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
  }, []);

  return (
    <section className="video-section">
      <div className="container">
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            color: "var(--color-gold)",
          }}
        >
          Discover Mogul Strategies
        </h2>

        <div className="video-container">
          <iframe
            ref={iframeRef}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "1.2rem",
            color: "#CCCCCC",
          }}
        >
          A glimpse into the world of sophisticated, diversified investing with
          Mogul Strategies.
        </p>
      </div>
    </section>
  );
}
