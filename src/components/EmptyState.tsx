import React from 'react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const DefaultEmptyIcon = () => (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="8" y="16" width="32" height="20" rx="4" fill="#e5e7eb" />
    <rect x="14" y="22" width="20" height="8" rx="2" fill="#cbd5e1" />
    <circle cx="18" cy="36" r="2" fill="#cbd5e1" />
    <circle cx="30" cy="36" r="2" fill="#cbd5e1" />
  </svg>
);

export { DefaultEmptyIcon };

export default function EmptyState({ icon, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {icon !== undefined ? (
        <div className="text-muted-foreground mb-2">{icon}</div>
      ) : (
        <div className="text-muted-foreground mb-2">
          <DefaultEmptyIcon />
        </div>
      )}
      <span className="text-muted-foreground text-base font-medium text-center">{message}</span>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
