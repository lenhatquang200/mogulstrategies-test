"use client";

import { useState } from "react";
import ContactInfo from "./ContactInfo";
import LoadingOverlay from "@/components/LoadingOverlay";
import { toast } from "react-toastify";
import type { ContactForm } from "@/types/contact.type";

export default function ContactForm() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    type: "",
    accredited: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;

    if (form.phone && !phoneRegex.test(form.phone)) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit form");
        return;
      }

      toast.success("Your request has been sent successfully. We will contact you as soon as possible.");
      setForm({
        name: "",
        email: "",
        phone: "",
        type: "",
        accredited: "",
        message: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-grid">
            <ContactInfo />

            <div className="contact-form">

              {loading && <LoadingOverlay />}

              <h3>Send Us a Message</h3>
              <form  onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required value={form.name}
                  onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required value={form.email}
                  onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input type="tel" id="phone" name="phone" value={form.phone}
                  onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Inquiry Type *</label>
                  <select id="type" name="type" required value={form.type}
                  onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="general">General Inquiry</option>
                    <option value="investment">
                      Investment Opportunities
                    </option>
                    <option value="portal">Investors Portal Access</option>
                    <option value="partnership">
                      Partnership / Syndication
                    </option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="accredited">
                    Are you an accredited investor? *
                  </label>
                  <select id="accredited" name="accredited" required value={form.accredited}
                  onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="institution">
                      Institutional Investor
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Please provide details about your inquiry..."
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>

              <p
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.9rem',
                  color: '#AAAAAA',
                }}
              >
                Your information is secure and will only be used in accordance
                with our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}
