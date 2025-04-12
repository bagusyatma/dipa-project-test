import { cn } from '@/lib/utils/helper';
import React from 'react';

const buttonVariants = {
  primary: 'bg-red-500 text-white hover:opacity-90',
  'primary-outline': 'border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white',
  secondary: 'bg-slate-500 text-white hover:opacity-90',
  'secondary-outline': 'border border-slate-500 text-slate-500 bg-transparent hover:bg-slate-500 hover:text-white',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-md font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
