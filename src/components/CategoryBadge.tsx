import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { toTitleCase } from '../lib/utils';
import React from 'react';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/?category=${encodeURIComponent(category)}`);
  };
  return (
    <Badge
      variant="secondary"
      className={`capitalize mb-2 inline-block cursor-pointer hover:opacity-80 transition ${className || ''}`}
      tabIndex={0}
      role="button"
      aria-label={`View products in ${toTitleCase(category)}`}
      onClick={handleClick}
    >
      {toTitleCase(category)}
    </Badge>
  );
}
