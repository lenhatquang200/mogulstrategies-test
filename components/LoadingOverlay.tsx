"use client";

export default function LoadingOverlay() {
  return (
    <>
      <div className="loading-overlay">
        <span className="loading-ring" />
      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-ring {
          width: 64px;
          height: 64px;
          border: 4px solid rgba(212, 175, 55, 0.25);
          border-top-color: var(--color-gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
