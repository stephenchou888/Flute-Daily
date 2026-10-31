import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'brand' | 'success' | 'amber';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-border',
    brand: 'border-brand/30 bg-brand/10 text-brand-strong dark:text-brand-400',
    success: 'border-success/30 bg-success/10 text-success',
    amber: 'border-brand/30 bg-brand/10 text-brand-strong dark:text-brand-400',
  }[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClasses,
        className
      )}
      {...props}
    />
  );
}
