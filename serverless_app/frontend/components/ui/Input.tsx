import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-night-sky mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-white text-night-sky placeholder-night-sky/50',
            'focus:outline-none focus:ring-2 focus:ring-enchanted-purple/50 focus:border-enchanted-purple',
            'transition-colors duration-200',
            error
              ? 'border-creative-coral focus:ring-creative-coral/50 focus:border-creative-coral'
              : 'border-night-sky/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-creative-coral">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
