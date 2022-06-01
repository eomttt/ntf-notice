import React, { HTMLProps } from 'react';

type InputProps = HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => (
  <input ref={ref} className="w-full h-12 rounded-lg border-2 border-black px-1  outline-primary" {...props} />
));

Input.displayName = 'Input';
