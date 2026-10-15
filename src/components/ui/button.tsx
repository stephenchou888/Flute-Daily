import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'emerald';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground shadow-sm hover:bg-teal-700 dark:hover:bg-teal-500",
      emerald: "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-red-600",
      outline: "border border-border bg-card hover:bg-accent hover:text-accent-foreground text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }[variant];

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-10 w-10",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
