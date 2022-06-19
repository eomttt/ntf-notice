import { useCallback, useEffect, useRef } from 'react';

export const useBodyLockScroll = (isLock: boolean) => {
  const lockScrollPosition = useRef(0);

  const lockScroll = useCallback((scrollPosition: number) => {
    const htmlElement = document.documentElement;
    const body = document.querySelector('body') as HTMLElement;

    htmlElement.style.height = '100vh';

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.left = '0';
    body.style.right = '0';
  }, []);

  const unLockScroll = useCallback((scrollPosition: number) => {
    const htmlElement = document.documentElement;
    const body = document.querySelector('body') as HTMLElement;

    htmlElement.style.removeProperty('height');

    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('left');
    body.style.removeProperty('right');
    window.scrollTo(0, scrollPosition);
  }, []);

  useEffect(() => {
    if (isLock) {
      lockScrollPosition.current = window.scrollY;
      lockScroll(lockScrollPosition.current);
    } else {
      unLockScroll(lockScrollPosition.current);
    }
  }, [isLock, lockScroll, unLockScroll]);

  // componentWillUnmount
  useEffect(
    () => () => {
      unLockScroll(lockScrollPosition.current);
    },
    [unLockScroll],
  );
};
