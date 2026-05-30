import React from "react";

export default function About() {
  return (
    <section className="grid md:grid-cols-12 gap-gutter items-start reveal" id="about">
      {/* Code metaphor heading */}
      <div className="md:col-span-4 font-label-sm text-on-surface-variant uppercase tracking-widest border-t border-outline-variant pt-4 select-none">
        // System.out.println(&quot;About&quot;);
      </div>

      {/* Philosophy container box */}
      <div className="md:col-span-8 bg-surface-container border border-outline-variant p-8 hover:border-primary-container transition-colors duration-500">
        <p className="font-body-lg text-lg md:text-body-lg text-on-surface mb-6 leading-relaxed">
          I engineer robust backend architectures and seamless frontend experiences, prioritizing performance and security over decorative elements. My focus is on shipping functional, scalable products using RESTful APIs and secure JWT authentication.
        </p>
        <p className="font-body-lg text-lg md:text-body-lg text-on-surface leading-relaxed">
          I thrive under pressure, consistently delivering mission-critical features within strict technical constraints. Ownership of the full stack allows me to foresee potential failures and build resilient systems from the ground up.
        </p>
      </div>
    </section>
  );
}
