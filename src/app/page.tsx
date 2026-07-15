import { HeroSection } from '@/components/sections/hero';
import dynamic from 'next/dynamic';

const StreakBoxSection = dynamic(() => import('@/components/sections/streakbox').then(mod => mod.StreakBoxSection));
const ExperienceSection = dynamic(() => import('@/components/sections/experience').then(mod => mod.ExperienceSection));

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <StreakBoxSection />
      <ExperienceSection />
    </main>
  );
}