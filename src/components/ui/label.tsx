import { type LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'label-caps text-ink-muted block mb-1.5',
        className
      )}
      {...props}
    />
  )
);
Label.displayName = 'Label';
