'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/sanity';

interface InfiniteProjectsListProps {
  initialProjects: Project[];
  initialHasMore: boolean;
  initialTotal: number;
}

export function InfiniteProjectsList({
  initialProjects,
  initialHasMore,
  initialTotal,
}: InfiniteProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMoreProjects = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects?page=${page}&pageSize=9`);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();

      setProjects((prev) => [...prev, ...data.projects]);
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError('Failed to load more projects. Please try again.');
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          loadMoreProjects();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, loadMoreProjects]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loadMoreRef} className="mt-12 text-center">
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading more projects...</p>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <p className="text-red-500">{error}</p>
            <Button variant="outline" onClick={loadMoreProjects}>
              Try Again
            </Button>
          </div>
        )}

        {!hasMore && projects.length > 0 && (
          <p className="text-muted-foreground">
            You&apos;ve reached the end of our projects ({projects.length} of{' '}
            {initialTotal})
          </p>
        )}
      </div>
    </>
  );
}
