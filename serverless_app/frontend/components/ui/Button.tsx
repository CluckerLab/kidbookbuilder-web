import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          {
            'bg-enchanted-purple text-white hover:bg-enchanted-purple/90 focus:ring-enchanted-purple':
              variant === 'primary',
            'bg-storybook-blue text-white hover:bg-storybook-blue/90 focus:ring-storybook-blue':
              variant === 'secondary',
            'border-2 border-enchanted-purple text-enchanted-purple hover:bg-enchanted-purple/10 focus:ring-enchanted-purple':
              variant === 'outline',
            'text-night-sky hover:bg-soft-cloud focus:ring-night-sky':
              variant === 'ghost',
          },
          // Sizes
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
