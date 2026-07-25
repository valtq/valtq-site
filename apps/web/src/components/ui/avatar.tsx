'use client';

import { forwardRef, useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  fallback?: string;
}

/**
 * Circular avatar with image or initials fallback.
 *
 * ```tsx
 * <Avatar src="/photo.jpg" alt="User" />
 * <Avatar fallback="AB" />
 * ```
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const showFallback = !src || hasError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-container-high',
          className,
        )}
      >
        {showFallback ? (
          <span className="text-sm font-medium text-on-surface-variant">
            {fallback ?? '?'}
          </span>
        ) : (
          <img
            src={src}
            alt={alt ?? ''}
            onError={() => setHasError(true)}
            className="aspect-square h-full w-full object-cover"
            {...props}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { Avatar };
