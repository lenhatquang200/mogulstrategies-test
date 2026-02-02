const SocialAuth = ({ onAuth }: { onAuth: (provider: string) => void }) => (
  <div className="social-auth text-center">
    <p className="disclaimer mb-2">
      Login with
    </p>

    <div className="flex justify-center items-center gap-2 text-sm">
      <button
        className="social-link google"
        onClick={() => onAuth('google')}
      >
        Gmail
      </button>

      <span className="divider">|</span>

      <button
        className="social-link apple"
        onClick={() => onAuth('apple')}
      >
        Apple
      </button>

      <span className="divider">|</span>

      <button
        className="social-link yahoo"
        onClick={() => onAuth('yahoo')}
      >
        Yahoo
      </button>

      <span className="divider">|</span>

      <button
        className="social-link linkedin"
        onClick={() => onAuth('linkedin')}
      >
        LinkedIn
      </button>
    </div>
  </div>
);

export default SocialAuth;
