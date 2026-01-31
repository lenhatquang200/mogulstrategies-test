'use client';

export default function StarryBackground() {
    return (
        <>
            {/* Background Image */}
            <div
                className="fixed inset-0 z-[-2] opacity-30 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1606125784258-570fc63c22c1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcCUyMHNwYWNlfGVufDB8fDB8fHww')",
                }}
            />

            {/* Shooting Stars */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white shadow-[0_0_10px_white] animate-shooting-star"
                        style={{
                            top: `${[20, 50, 10, 70, 30][i]}%`,
                            left: '-10%',
                            animationDelay: `${i * 3}s`,
                            animationDuration: `${[8, 10, 12, 7, 9][i]}s`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
