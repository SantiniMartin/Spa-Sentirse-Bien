import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
    secondary: 'bg-[#c0edc7] hover:bg-[#a9e4b2] text-emerald-800 focus:ring-[#c0edc7]',
    outline: 'border border-emerald-500 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-300',
    text: 'text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-300'
  };
  
  const sizeClasses = 'px-4 py-2 text-sm';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2"></div>
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;