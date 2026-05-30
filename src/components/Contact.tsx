"use client";

import React, { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple basic validations
    if (!email) {
      setStatus("error");
      setErrorMessage("HEADER_ERROR: Email address is required.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMessage("HEADER_ERROR: Invalid email format.");
      return;
    }
    if (!message) {
      setStatus("error");
      setErrorMessage("PAYLOAD_ERROR: Content buffer cannot be empty.");
      return;
    }

    setStatus("sending");
    
    // Simulate API network latency
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section className="grid md:grid-cols-12 gap-gutter items-start reveal" id="contact">
      {/* Code metaphor heading */}
      <div className="md:col-span-4 font-label-sm text-on-surface-variant uppercase tracking-widest border-t border-outline-variant pt-4 select-none">
        // POST /api/contact
      </div>

      <div className="md:col-span-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label className="block font-label-sm text-primary-fixed mb-2 select-none" htmlFor="email">
              &gt; EMAIL_ADDRESS
            </label>
            <input
              className="w-full bg-surface-container border-outline-variant border text-on-surface font-label-sm p-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed transition-colors outline-none placeholder:text-on-surface-variant/40"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="user@domain.com"
              disabled={status === "sending"}
            />
          </div>

          {/* Message input field */}
          <div>
            <label className="block font-label-sm text-primary-fixed mb-2 select-none" htmlFor="message">
              &gt; PAYLOAD
            </label>
            <textarea
              className="w-full bg-surface-container border-outline-variant border text-on-surface font-label-sm p-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed transition-colors outline-none placeholder:text-on-surface-variant/40 resize-y"
              id="message"
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Initialize connection..."
              disabled={status === "sending"}
            />
          </div>

          {/* Form statuses */}
          {status === "error" && (
            <div className="border border-error bg-error-container/20 text-error font-label-sm p-4 select-none">
              [SYSTEM_FAILURE] {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="border border-primary-fixed bg-primary-fixed/10 text-primary-fixed font-label-sm p-4 select-none">
              [TRANSMISSION_COMPLETE] HTTP 202: Message successfully routed.
            </div>
          )}

          {/* Submit CTA button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary btn-cta border border-primary-fixed bg-primary-fixed text-on-primary-fixed font-label-sm px-8 py-4 uppercase tracking-widest w-full md:w-auto font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Transmitting Packet..." : "Execute Transmission"}
          </button>
        </form>

        {/* Footer social profile links */}
        {/* <div className="mt-12 flex flex-wrap gap-8 border-t border-outline-variant pt-8">
          <a
            className="nav-link font-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors uppercase font-bold"
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Accessing Pranav's GitHub repository (mocked)."); }}
          >
            GitHub
          </a>
          <a
            className="nav-link font-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors uppercase font-bold"
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Accessing Pranav's LinkedIn profile (mocked)."); }}
          >
            LinkedIn
          </a>
          <a
            className="nav-link font-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors uppercase font-bold"
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Accessing Pranav's LeetCode profile (mocked)."); }}
          >
            LeetCode
          </a>
        </div> */}
      </div>
    </section>
  );
}
