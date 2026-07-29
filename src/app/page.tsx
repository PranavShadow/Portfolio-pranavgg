import { HeroSection } from '@/components/sections/hero';
import { HomeTeaserSections } from '@/components/sections/home-teaser-sections';
import dynamic from 'next/dynamic';

const StreakBoxSection = dynamic(() => import('@/components/sections/streakbox').then(mod => mod.StreakBoxSection));
const ExperienceSection = dynamic(() => import('@/components/sections/experience').then(mod => mod.ExperienceSection));

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <HomeTeaserSections />
      <StreakBoxSection />
      <ExperienceSection />
    </main>
  );
}