'use client';

import { useState, useEffect, useRef } from 'react';

const VIDEO_IDS = [
    "117wMHEQTEIa1gcbiyJu3po9nXkyWICwH",
    "1zVH9LXRe2-5nVuCkMfPcUQLwaImqKQhz",
    "1E3QhY8HcdOXDCHAd_j7RX66h2ft8QRk5"
];

export default function VideoSlider() {
    const [index, setIndex] = useState(0);
    // Initialize loaded to true to ensure video loads immediately without IntersectionObserver complexity for now
    const [loaded, setLoaded] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-cycle logic
    useEffect(() => {
        // Clear existing interval on unmount or dependency change
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % VIDEO_IDS.length);
        }, 45000);

        return () => clearInterval(interval);
    }, [index]);

    const loadVideo = (i: number) => {
        const newIndex = (i + VIDEO_IDS.length) % VIDEO_IDS.length;
        setIndex(newIndex);
        setLoaded(true);
    };

    const nextVideo = () => loadVideo(index + 1);
    const prevVideo = () => loadVideo(index - 1);

    // Use isClient check to avoid hydration mismatch
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <div ref={containerRef} className="video-section">
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#D4AF37' }}>Discover Mogul Strategies</h2>

                <div style={{ position: 'relative' }}>
                    <button className="video-nav prev" onClick={prevVideo}>&#10094;</button>
                    <div className="video-container" id="videoContainer">
                        {loaded && (
                            <iframe
                                key={VIDEO_IDS[index]} // Critical: Use key to verify if it fixes loading issues
                                src={`https://drive.google.com/file/d/${VIDEO_IDS[index]}/preview`}
                                allow="autoplay; fullscreen"
                                title="Mogul Video"
                                style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            />
                        )}
                    </div>
                    <button className="video-nav next" onClick={nextVideo}>&#10095;</button>
                </div>

                <div className="video-controls" id="videoControls">
                    {VIDEO_IDS.map((_, i) => (
                        <div
                            key={i}
                            className={`video-dot ${i === index ? 'active' : ''}`}
                            onClick={() => loadVideo(i)}
                        />
                    ))}
                </div>

                <p style={{ marginTop: '1.5rem', fontSize: '1.2rem', color: '#CCCCCC' }}>
                    A glimpse into the world of sophisticated, diversified investing with Mogul Strategies.
                </p>
            </div>
        </div>
    );
}
