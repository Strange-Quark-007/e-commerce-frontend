import React from 'react';
import { Button } from './ui/button';

export default function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <span className="text-destructive text-sm font-medium">{message}</span>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} size="sm">
          Retry
        </Button>
      )}
    </div>
  );
}
