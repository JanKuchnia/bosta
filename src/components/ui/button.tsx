import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-gold text-ink',
        outline:  'border border-ink text-ink hover:bg-ink hover:text-canvas',
        ghost:    'text-ink hover:bg-muted',
        link:     'text-cta underline-offset-4 hover:underline p-0 h-auto',
        white:    'bg-canvas text-ink hover:bg-canvas/90',
        'outline-white': 'border border-white/60 text-white hover:bg-white/10',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm',
        sm:      'h-9 px-4 text-sm',
        lg:      'h-14 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
