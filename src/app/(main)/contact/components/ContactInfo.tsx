"use client";

export default function ContactForm() {

  return (
    <div className="contact-info">
      <h3>Contact Information</h3>
      <ul>
        <li>
          <strong>Phone:</strong>{' '}
          <a href="tel:+18007760990">(800) 776-0990</a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:info@mogulstrategies.com">
            info@mogulstrategies.com
          </a>
        </li>
        <li>
          <strong>Investor Relations:</strong>{' '}
          <a href="mailto:ir@mogulstrategies.com">
            ir@mogulstrategies.com
          </a>
        </li>
        <li>
          <strong>Office Hours:</strong> Monday – Friday, 9:00 AM – 6:00
          PM EST
        </li>
        <li>
          <strong>Mailing Address:</strong>
          <br />
          Mogul Strategies Inc.
          <br />
          48 Wall St, Suite 1100
          <br />
          New York, NY 10005
          <br />
          United States
        </li>
      </ul>
      <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
        <strong>Note:</strong> All investments are available exclusively
        to accredited investors as defined by SEC regulations.
      </p>
    </div>
  );
}
