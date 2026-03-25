'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <Skeleton className="h-4 w-3/4 mb-3" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      ))}
    </div>
  );
}
