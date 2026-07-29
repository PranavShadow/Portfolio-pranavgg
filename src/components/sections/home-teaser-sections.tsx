import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenText, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/lib/api';

const aboutIntro = "I'm a passionate Software Engineer who loves building products that solve real-world problems. Over time, I've been a bit of a jack of all trades, exploring domains like Computer Vision, 2D Game Development, Full-Stack Web Development, and AI-powered applications. I enjoy taking ideas from concept to completion, constantly learning new technologies, and challenging myself with unfamiliar problems.";

export async function HomeTeaserSections() {
  const projects = await getProjects();
  const productionProjects = projects
    .filter((project) => project.topics.includes('production'))
    .slice(0, 3);

  const featuredProjects = productionProjects.length > 0 ? productionProjects : projects.slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[28px] border border-border/60 bg-background/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-border/60 bg-muted/40">
              <Image src="/author.jpg" alt="Pranav Gupta" fill className="object-cover" />
            </div>

            <div className="flex min-h-[256px] flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-primary/90">
                  About
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  A short look at who I am
                </h2>
                <p className="mt-2 text-sm leading-8 text-muted-foreground">
                  {aboutIntro}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
              <Button asChild variant="outline" className="h-10 rounded-full border-primary/20 bg-background/60 px-5 text-sm font-medium text-foreground hover:bg-primary/5">
                  <Link href="/about" className="flex items-center gap-2">
                    Read complete about
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[28px] border border-border/60 bg-background/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-primary/90">
                Projects
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Selected build highlights
              </h2>
            </div>
            
          </div>

          <div className="mt-5 space-y-3">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-border/60 bg-background/60 px-4 py-3"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    {project.description || 'A thoughtful product built with care.'}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0 border-primary/10 bg-primary/5 text-primary">
                  Production
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button asChild variant="outline" className="h-10 rounded-full border-primary/20 bg-background/60 px-5 text-sm font-medium text-foreground hover:bg-primary/5">
              <Link href="/projects" className="flex items-center gap-2">
                View more projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
