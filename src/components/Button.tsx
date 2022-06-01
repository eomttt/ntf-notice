import { HTMLProps } from 'react';

/* eslint-disable react/button-has-type */
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
}

export const Button = ({ className, type, label, onClick, ...rest }: ButtonProps) => (
  <button
    className={`min-w-24 h-12 rounded-lg border-2 border-black p-2 font-bold bg-primary whitespace-nowrap ${className}`}
    type={type}
    onClick={onClick}
    {...rest}>
    {label}
  </button>
);
