import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export function Button({ label, variant = 'primary', size = 'medium', className = '', onClick, ...props }: ButtonProps) {
  const baseStyle = `w-full py-3 px-6 rounded-full font-semibold transition duration-200 shadow-lg text-sm`;
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };

  const sizes = {
    small: 'py-2 px-4 text-xs',
    medium: 'py-3 px-6 text-sm',
    large: 'py-4 px-8 text-lg',
  };

  // Maneja el evento onClick, si existe
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);  // Llama al onClick pasado como prop
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
    </button>
  );
}
