"use client";
import { useState } from "react";

const FAQS = [
  {
    question: "How do I access my fund documents?",
    answer:
      'All fund documents, including PPMs, subscription agreements, and quarterly reports, are available in the "Documents & Reports" section. Use the search or filter by fund to locate specific files.',
  },
  {
    question: "When will I receive my Schedule K-1?",
    answer:
      'Schedule K-1 forms are typically delivered by mid-March each year. Estimated K-1s are provided in Q1 for tax planning purposes. Check the "Distributions & Tax" section for updates.',
  },
  {
    question: "How are capital calls processed?",
    answer:
      "Capital calls are announced 30 days in advance via notification and email. Payment instructions (wire, ACH, crypto) are provided in the Capital Calls section. Contact support for assistance.",
  },
  {
    question: "Can I change my distribution preferences?",
    answer:
      "Yes. Reinvestment vs. cash distribution preferences can be updated in your Account Settings or by contacting your relationship manager via Secure Messaging.",
  },
  {
    question: "How is portfolio performance calculated?",
    answer:
      "Performance is reported net of fees on a time-weighted basis. Detailed methodology and benchmark comparisons are available in the Performance Analytics section.",
  },
  {
    question: "Who is my primary contact?",
    answer:
      "Your dedicated relationship manager is listed in your Account Information. You can reach them directly through Secure Messaging or by phone at (800) 776-0990.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-container">
      <h2 className="section-title">Frequently Asked Questions</h2>

      {FAQS.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <div
            className="faq-question"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            {faq.question}
          </div>

          {openIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </section>
  );
}
