import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string | FieldError;
}

export function Input({
  label,
  icon,
  error,
  className = '',
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const finalType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Detectar si error es string o FieldError
  const errorMessage =
    typeof error === 'string' ? error : error?.message || '';

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
            {icon}
          </span>
        )}

        <input
          {...props}
          type={finalType}
          autoComplete={isPassword ? 'new-password' : undefined}
          className={`w-full py-2.5 pl-10 pr-${isPassword ? '12' : '4'} rounded-lg border ${
            errorMessage ? 'border-red-400' : 'border-gray-300'
          } focus:outline-none focus:ring-2 ${
            errorMessage ? 'focus:ring-red-400' : 'focus:ring-blue-400'
          } bg-white text-gray-800 placeholder-gray-400 ${className}`}
        />

        {isPassword && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}