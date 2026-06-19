import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[140px] w-full border border-border bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 resize-y',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
