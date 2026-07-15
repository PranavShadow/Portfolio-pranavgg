import React from 'react';
import { buildMetadata, siteConfig } from '@/config/site.config';
import ContactCard from '@/components/sections/contact-card';

export const metadata = buildMetadata({
  title: `Contact Pranav Gupta`,
  description: 'Get in touch about landing pages, branding, or templates.',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <ContactCard />
    </div>
  );
}
