import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.querySelector('#__modal') as Element) : null;
};
