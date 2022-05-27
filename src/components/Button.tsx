/* eslint-disable react/button-has-type */
interface ButtonProps {
  className?: string;
  type: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
}

export const Button = ({ className, type, label, onClick }: ButtonProps) => (
  <button
    className={`h-12 rounded-lg border-solid border-2 p-2 text-white font-bold bg-cyan-500 active:bg-cyan-600 ${className}`}
    type={type}
    onClick={onClick}>
    {label}
  </button>
);
