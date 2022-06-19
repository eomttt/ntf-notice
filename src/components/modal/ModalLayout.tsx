/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useBodyLockScroll } from 'hooks/useBodyLockScroll';
import { ReactNode } from 'react';

interface ModalLayoutProps {
  children: ReactNode;
  isShow: boolean;
  revealModal: boolean;
  onClick?: () => void;
}

export const ModalLayout = ({ children, isShow, revealModal, onClick }: ModalLayoutProps) => {
  useBodyLockScroll(isShow);

  if (!isShow) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-modalBg" onClick={onClick}>
      <div className="w-full h-full flex justify-center items-center">
        <div
          className={`
          ${revealModal ? 'opacity-1' : 'opacity-0'}
          ${revealModal ? 'translate-y-0' : 'translate-y-10'}
          ease-in-out transition-transitionModalProperty duration-150`}>
          {children}
        </div>
      </div>
    </div>
  );
};
