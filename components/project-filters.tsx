'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterOption {
  _id: string;
  name: string;
}

interface ProjectFiltersProps {
  architects: FilterOption[];
  manufacturers: FilterOption[];
}

export function ProjectFilters({
  architects,
  manufacturers,
}: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const architectId = searchParams.get('architect') || '';
  const manufacturerId = searchParams.get('manufacturer') || '';

  const hasFilters = architectId || manufacturerId;

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/projects?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push('/projects');
  }, [router]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={architectId}
        onValueChange={(value) => updateFilter('architect', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Architect" />
        </SelectTrigger>
        <SelectContent>
          {architects.map((architect) => (
            <SelectItem key={architect._id} value={architect._id}>
              {architect.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={manufacturerId}
        onValueChange={(value) => updateFilter('manufacturer', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Manufacturer" />
        </SelectTrigger>
        <SelectContent>
          {manufacturers.map((manufacturer) => (
            <SelectItem key={manufacturer._id} value={manufacturer._id}>
              {manufacturer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
