"use client";

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Calendar,
  Clock,
  AlertCircle,
  BookOpen,
  Rss,
  Search,
  X,
  Filter,
  PenTool
} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

interface Post {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes?: number;
  coverImage?: string;
  tags: { name: string }[];
  source: 'hashnode' | 'medium' | 'wordpress';
}

interface PostsGridProps {
  initialPosts?: Post[];
}

export function PostsGrid({ initialPosts = [] }: PostsGridProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showTags, setShowTags] = useState(false);
  const pageSize = 12;

  // Filter posts logic
  const displayedPosts = initialPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.brief.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? post.tags.some(t => t.name === selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(displayedPosts.length / pageSize);

  // Derive unique tags from posts
  const allTags = initialPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      if (!acc.includes(tag.name)) {
        acc.push(tag.name);
      }
    });
    return acc;
  }, [] as string[]).sort();

  return (
    <>
      <div className="mb-10 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search articles..."
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
          <div className="flex flex-col items-center gap-2">
            {!showTags && selectedTag === null ? (
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
                  variant={selectedTag === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setSelectedTag(null); setCurrentPage(1); }}
                  className={`rounded-full px-4 h-8 text-xs ${selectedTag === null
                    ? 'shadow-md'
                    : 'bg-background/50 hover:bg-muted'
                    }`}
                >
                  All
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setSelectedTag(tag); setCurrentPage(1); }}
                    className={`rounded-full px-4 h-8 text-xs ${selectedTag === tag
                      ? 'shadow-md'
                      : 'bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {tag}
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

          {(search || selectedTag) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
              <span>
                Found {displayedPosts.length} article{displayedPosts.length !== 1 ? 's' : ''}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <button
                onClick={() => { setSearch(''); setSelectedTag(null); setCurrentPage(1); }}
                className="text-primary hover:underline underline-offset-4 font-medium text-xs"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full flex flex-col"
            >
              <Card className="group h-full flex flex-col overflow-hidden border bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden border-b bg-muted/20">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 4}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/30">
                      {post.source === 'hashnode' ? <BookOpen className="h-10 w-10 text-muted-foreground/20" /> :
                       post.source === 'medium' ? <Rss className="h-10 w-10 text-muted-foreground/20" /> :
                       <PenTool className="h-10 w-10 text-muted-foreground/20" />}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                  {/* Source Badge */}
                  <Badge variant="secondary" className="absolute top-3 right-3 z-20 text-[10px] bg-background/90 backdrop-blur-sm border-border/50 shadow-sm px-2 h-5 flex gap-1 items-center">
                    {post.source === 'hashnode' ? (
                      <><BookOpen className="h-3 w-3" /> Hashnode</>
                    ) : post.source === 'medium' ? (
                      <><Rss className="h-3 w-3" /> Medium</>
                    ) : (
                      <><PenTool className="h-3 w-3" /> WordPress</>
                    )}
                  </Badge>
                </div>

                <CardHeader className="p-4 space-y-2 flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-3 text-xs leading-relaxed">
                    {post.brief}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0 flex flex-col gap-4 mt-auto">
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 h-[22px] overflow-hidden">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.name}
                          className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3 mt-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      {post.readTimeInMinutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTimeInMinutes} min</span>
                        </div>
                      )}
                    </div>
                    <Button asChild variant="ghost" size="sm" className="h-7 px-2 -mr-2 text-xs hover:bg-primary/10 hover:text-primary">
                      <Link
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Read
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
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
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
