/* eslint-disable react/button-has-type */
interface ButtonProps {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
}

export const Button = ({ className, type, label, onClick }: ButtonProps) => (
  <button
    className={`min-w-24 h-12 rounded-lg border-solid border-2 p-2 text-white font-bold bg-cyan-500 active:bg-cyan-600 whitespace-nowrap ${className}`}
    type={type}
    onClick={onClick}>
    {label}
  </button>
);
