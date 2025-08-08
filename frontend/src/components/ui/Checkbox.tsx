import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  labelPosition?: 'left' | 'right';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      labelPosition = 'right',
      variant = 'default',
      size = 'md',
      indeterminate = false,
      error,
      className = '',
      containerClassName = '',
      labelClassName = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'border-gray-300 text-blue-600 focus:ring-blue-500',
      primary: 'border-blue-500 text-blue-600 focus:ring-blue-500',
      success: 'border-green-500 text-green-600 focus:ring-green-500',
      warning: 'border-yellow-500 text-yellow-600 focus:ring-yellow-500',
      danger: 'border-red-500 text-red-600 focus:ring-red-500',
    };

    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const baseClasses =
      'rounded border focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';

    return (
      <div className={`flex items-center ${containerClassName}`}>
        {label && labelPosition === 'left' && (
          <label
            htmlFor={props.id}
            className={`mr-2 text-${size} ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
          />
          {(props.checked || indeterminate) && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Check
                className={`${
                  indeterminate ? 'opacity-0' : 'opacity-100'
                } w-3/4 h-3/4 text-current`}
                strokeWidth={3}
              />
              {indeterminate && (
                <span className="absolute w-3/4 h-0.5 bg-current rounded-full" />
              )}
            </span>
          )}
        </div>

        {label && labelPosition === 'right' && (
          <label
            htmlFor={props.id}
            className={`ml-2 text-${size} ${labelClassName}`}
          >
            {label}
          </label>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${props.id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;