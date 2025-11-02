// Reusable Input component with validation

import React from 'react';
import { InputProps } from '@/types/components';
import { cn } from '@/utils';

const Input: React.FC<InputProps> = ({
     label,
     placeholder,
     value,
     onChange,
     error,
     disabled = false,
     required = false,
     type = 'text',
     className,
     ...props
}) => {
     const inputClasses = cn(
          'w-full px-3 py-2 border rounded-md text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          className
     );

     return (
          <div className="space-y-1">
               {label && (
                    <label className="block text-sm font-medium text-gray-700">
                         {label}
                         {required && (
                              <span className="text-red-500 ml-1">*</span>
                         )}
                    </label>
               )}
               <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    {...props}
               />
               {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
     );
};

export default Input;
