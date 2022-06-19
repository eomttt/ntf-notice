import { HTMLProps, ReactNode } from 'react';

/* eslint-disable react/button-has-type */
interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'label'> {
  className?: string;
  buttonType?: 'primary' | 'secondary';
  type: 'button' | 'submit' | 'reset';
  label: ReactNode;
  onClick?: () => void;
}

export const Button = ({ className, type, label, onClick, buttonType = 'primary', ...rest }: ButtonProps) => (
  <button
    className={`min-w-24 h-12 rounded-lg border-2 border-black p-2 font-bold whitespace-nowrap ${
      buttonType === 'primary' ? 'bg-primary' : 'bg-white'
    } ${className}`}
    type={type}
    onClick={onClick}
    {...rest}>
    {label}
  </button>
);
