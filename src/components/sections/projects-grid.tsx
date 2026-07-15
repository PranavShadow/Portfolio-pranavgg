"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,

  AlertCircle,
  Search,
  X,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,

} from '@/components/ui/pagination';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface Project extends GitHubRepo { }

interface ProjectsGridProps {
  initialProjects?: GitHubRepo[];
  initialSelectedTopic?: string | null;
}

export function ProjectsGrid({ initialProjects = [], initialSelectedTopic }: ProjectsGridProps) {
  // Derive unique topics from projects
  const allTopics = initialProjects.reduce((acc, project) => {
    project.topics.forEach(topic => {
      if (!acc.includes(topic)) {
        acc.push(topic);
      }
    });
    return acc;
  }, [] as string[]).sort();

  const [selectedTopic, setSelectedTopic] = useState<string | null>(
    typeof initialSelectedTopic === 'undefined'
      ? allTopics.includes('production')
        ? 'production'
        : null
      : initialSelectedTopic
  );
  const [search, setSearch] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Filter projects
  const displayedProjects = initialProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(search.toLowerCase()));
    const matchesTopic = selectedTopic ? project.topics.includes(selectedTopic) : true;
    return matchesSearch && matchesTopic;
  });

  const totalPages = Math.ceil(displayedProjects.length / pageSize);
  const paginatedProjects = displayedProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <>
      {/* Projects Search Bar & Tag Filter (mobile) */}
      <div className="mb-10 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-10 h-10 bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/50 transition-all focus:ring-1 focus:ring-primary/20 rounded-full"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categories/Tags */}
        <div className="flex flex-col items-center gap-4">
          {/* Desktop/Tablet: centered list of tags */}
          <div className="flex flex-col items-center gap-2">
            {!showTags && selectedTopic === null ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTags(true)}
                className="rounded-full gap-2 bg-background/50 hover:bg-muted"
              >
                <Filter className="h-3.5 w-3.5" />
                Filter by Topic
              </Button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <Button
                  variant={selectedTopic === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setSelectedTopic(null); setCurrentPage(1); }}
                  className={`rounded-full px-4 h-8 text-xs ${selectedTopic === null
                    ? 'shadow-md'
                    : 'bg-background/50 hover:bg-muted'
                    }`}
                >
                  All
                </Button>
                {allTopics.map((topic) => (
                  <Button
                    key={topic}
                    variant={selectedTopic === topic ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setSelectedTopic(topic); setCurrentPage(1); }}
                    className={`rounded-full px-4 h-8 text-xs ${selectedTopic === topic
                      ? 'shadow-md'
                      : 'bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {topic}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTags(false)}
                  className="rounded-full h-8 w-8 p-0"
                  title="Hide filters"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {(search || selectedTopic) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
              <span>
                Found {displayedProjects.length} project{displayedProjects.length !== 1 ? 's' : ''}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <button
                onClick={() => { setSearch(''); setSelectedTopic(null); setCurrentPage(1); }}
                className="text-primary hover:underline underline-offset-4 font-medium text-xs"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="h-full flex flex-col"
          >
            <Card className="group h-full flex flex-col overflow-hidden border bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden border-b bg-muted/20">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                <Image
                  src={`https://opengraph.githubassets.com/1/${project.full_name}`}
                  alt={project.name}
                  width={400}
                  height={160}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  priority={index < 4}
                />
                {project.language && (
                  <Badge variant="secondary" className="absolute top-2 right-2 z-20 text-[10px] bg-background/90 backdrop-blur-sm border-border/50 shadow-sm px-2 h-5">
                    {project.language}
                  </Badge>
                )}
              </div>

              <CardHeader className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 text-xs leading-relaxed h-9">
                  {project.description || 'No description provided.'}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end gap-4">
                <div className="flex flex-wrap gap-1.5 h-[22px] overflow-hidden">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.topics.length > 3 && (
                    <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      +{project.topics.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3 mt-1">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {project.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {project.forks_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(project.updated_at)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={project.html_url}
                      target="_blank"
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="View Code"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                    {project.homepage && (
                      <Link
                        href={project.homepage}
                        target="_blank"
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="View Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(p => Math.max(1, p - 1));
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={e => { e.preventDefault(); setCurrentPage(i + 1); }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(p => Math.min(totalPages, p + 1));
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}
