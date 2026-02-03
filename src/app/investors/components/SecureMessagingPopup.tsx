const SecureMessagingPopup = () => {
  return (
    <div className="top-card messaging-card">
      <h3>Secure Messaging</h3>
      <p>Communicate directly with your relationship manager.</p>

      <a href="#" className="block my-4 font-bold text-yellow-400">
        Open Inbox (2 unread)
      </a>

      <textarea
        placeholder="Type your message..."
        className="w-full h-[100px] p-4 bg-[#0A1A2F] border border-yellow-400 rounded-lg text-gray-200"
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <button className="bg-yellow-400 text-[#0A1A2F] px-6 py-3 rounded-lg font-semibold" onClick={() => alert('Message sent feature coming soon!')}>
          Send Message
        </button>

        <div className="text-xs leading-tight text-[#d4af37] text-right">
          <p>WE OFFER SUPPORT 24/7</p>
          <p>INVESTOR RELATIONS HOTLINE</p>
          <p className="font-semibold text-white text-lg">
            1-800-776-0990
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureMessagingPopup;
