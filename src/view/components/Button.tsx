import { ComponentProps } from 'react';
import { cn } from '../../app/utils/cn';

interface ButtonProps extends ComponentProps<'button'>{
  isLoading?: boolean;
}
export function Button({className, isLoading, disabled, ...props}: ButtonProps) {
  return (
    <button
    {...props }
    disabled={disabled || isLoading}
    className={cn("bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl text-white font-mediumdisabled:text-gray-400 disabled:cursor-not-allowed transition-all", className)}
    />
  )
}
