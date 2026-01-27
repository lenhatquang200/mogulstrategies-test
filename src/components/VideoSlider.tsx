'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Type declaration for YouTube API
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: (() => void) | null;
    }
}

// Load YouTube API script
const loadYouTubeAPI = () => {
    if (typeof window !== 'undefined' && !window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
};

// Multiple video sources for better reliability
interface VideoSource {
    type: 'youtube';
    id: string;
    title: string;
}

const VIDEO_SOURCES: VideoSource[] = [
    {
        type: 'youtube',
        id: "e0Gs1Fj4-Tg", // YouTube video 1
        title: "Mogul Strategies - Investment Excellence"
    },
    {
        type: 'youtube',
        id: "5bm_i4r52do", // YouTube video 2
        title: "Portfolio Management & Digital Assets"
    },
    {
        type: 'youtube',
        id: "t3PivbBK618", // YouTube video 3
        title: "Wealth Acceleration Strategies"
    }
];

// Enable auto-play and auto-cycle
const AUTO_PLAY_ENABLED = true;
const AUTO_CYCLE_ENABLED = true;
const AUTO_CYCLE_INTERVAL = 30000; // 30 seconds per video

export default function VideoSlider() {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize client-side
    useEffect(() => {
        setIsClient(true);
        loadYouTubeAPI(); // Load YouTube API for better autoplay
    }, []);

    const loadVideo = useCallback((i: number) => {
        const newIndex = (i + VIDEO_SOURCES.length) % VIDEO_SOURCES.length;
        if (newIndex !== index) {
            setIsLoading(true);
            setError(null);
            setVideoEnded(false);
            setIndex(newIndex);
        }
    }, [index]);

    // Auto-cycle logic - chỉ chuyển khi video kết thúc
    useEffect(() => {
        if (!AUTO_CYCLE_ENABLED) return;
        
        let timer: NodeJS.Timeout;
        
        if (videoEnded) {
            // Video đã thực sự kết thúc - chuyển ngay lập tức
            console.log(`Video ${index + 1} ended. Switching immediately to video ${index + 2}...`);
            loadVideo(index + 1);
        } else {
            // FALLBACK: nếu không detect được video ended, dùng timer cho YouTube videos
            let fallbackTime = 45000; // YouTube videos usually ~45s
            
            console.log(`Fallback timer set: Will switch to video ${index + 2} in ${fallbackTime/1000}s if no end event detected`);
            timer = setTimeout(() => {
                console.log(`Fallback timer triggered - switching to video ${index + 2}`);
                loadVideo(index + 1);
            }, fallbackTime);
        }

        return () => clearTimeout(timer);
    }, [videoEnded, index, loadVideo]);

    // Handle iframe messages for YouTube video events
    useEffect(() => {
        if (!isClient) return;

        const handleMessage = (event: MessageEvent) => {
            console.log('Received message:', event.data); // Debug log
            
            // YouTube iframe API
            if (event.data && typeof event.data === 'string') {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === 'onStateChange' && data.info === 0) { // Video ended
                        console.log('YouTube video ended');
                        handleVideoEnded();
                    }
                } catch (e) {
                    // Not JSON, ignore
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [isClient]);

    const nextVideo = () => loadVideo(index + 1);
    const prevVideo = () => loadVideo(index - 1);

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    const handleVideoError = () => {
        setError('Failed to load video. Please try another.');
        setIsLoading(false);
    };

    const handleVideoEnded = () => {
        setVideoEnded(true);
    };

    // Early return after all hooks are defined
    if (!isClient) return null;

    const currentVideo = VIDEO_SOURCES[index];
    const getVideoUrl = () => {
        // All videos are YouTube now - force autoplay with &autoplay=1
        return `https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=1&mute=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&version=3&playerapiid=ytplayer`;
    };

    const renderVideoPlayer = () => {
        // All videos are YouTube now - render iframe
        return (
            <iframe
                key={`${currentVideo.id}-${Date.now()}`} // Force reload on video change
                id="youtube_player"
                src={getVideoUrl()}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title={currentVideo.title}
                onLoad={handleVideoLoad}
                onError={handleVideoError}
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px'
                }}
            />
        );
    };

    return (
        <div ref={containerRef} className="video-section">
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#D4AF37' }}>Discover Mogul Strategies</h2>

                <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
                    <button 
                        className="video-nav prev" 
                        onClick={prevVideo} 
                        aria-label="Previous video"
                        style={{
                            position: 'absolute',
                            left: '-50px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(212, 175, 55, 0.8)',
                            color: '#0A1A2F',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        &#10094;
                    </button>
                    
                    <div className="video-container" style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                        background: '#000',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        {isLoading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#D4AF37',
                                fontSize: '1.2rem',
                                zIndex: 5,
                                textAlign: 'center'
                            }}>
                                <div style={{ marginBottom: '1rem' }}>Loading video...</div>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    border: '3px solid rgba(212, 175, 55, 0.3)', 
                                    borderTop: '3px solid #D4AF37', 
                                    borderRadius: '50%', 
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto'
                                }}></div>
                            </div>
                        )}
                        
                        {error && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#ff6b6b',
                                fontSize: '1rem',
                                zIndex: 5,
                                textAlign: 'center',
                                padding: '1rem',
                                background: 'rgba(0, 0, 0, 0.8)',
                                borderRadius: '8px'
                            }}>
                                {error}
                            </div>
                        )}
                        
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: isLoading ? 0.3 : 1,
                            transition: 'opacity 0.3s ease'
                        }}>
                            {renderVideoPlayer()}
                        </div>
                    </div>
                    
                    <button 
                        className="video-nav next" 
                        onClick={nextVideo} 
                        aria-label="Next video"
                        style={{
                            position: 'absolute',
                            right: '-50px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(212, 175, 55, 0.8)',
                            color: '#0A1A2F',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        &#10095;
                    </button>
                </div>

                <div className="video-controls" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem'
                }}>
                    {VIDEO_SOURCES.map((video, i) => (
                        <div
                            key={i}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: i === index ? '#D4AF37' : 'rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => loadVideo(i)}
                            role="button"
                            aria-label={`Go to video ${i + 1}: ${video.title}`}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && loadVideo(i)}
                        />
                    ))}
                </div>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: '#CCCCCC', marginBottom: '0.5rem' }}>
                        {currentVideo.title}
                    </p>
                    <p style={{ fontSize: '1rem', color: '#AAAAAA' }}>
                        A glimpse into the world of sophisticated, diversified investing with Mogul Strategies.
                    </p>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .video-nav:hover {
                    background: #D4AF37 !important;
                    transform: translateY(-50%) scale(1.1);
                }
            `}</style>
        </div>
    );
}
