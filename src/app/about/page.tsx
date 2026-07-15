import { AboutHeader } from '@/components/sections/about-header';
import { AboutContent } from '@/components/sections/about-content';
import { siteConfig } from '@/config/site.config';

export const metadata = {
  title: `About Pranav Gupta`,
  description: siteConfig.about,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <AboutHeader />
          </div>
          <div className="lg:col-span-7">
            <AboutContent />
          </div>
        </div>
      </div>
    </div>
  );
}
