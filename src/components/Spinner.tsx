import React from 'react';

export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-primary h-6 w-6 align-middle ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
