import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'brand';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] touch-manipulation";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      success: "bg-success text-success-foreground shadow-xs hover:bg-success/90",
      brand: "bg-brand text-brand-foreground shadow-xs hover:bg-brand/90",
      destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground text-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }[variant];

    const sizeClasses = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-6 text-base font-semibold",
      icon: "h-9 w-9",
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
