import { useCallback, useState } from 'react';

export const MODAL_ANIMATED_TIME = 0.15; // 0.15sec

export const useShowModal = () => {
  const [isShow, setIsShow] = useState(false);
  const [revealModal, setRevealModal] = useState(false);

  const showModal = useCallback(() => {
    setIsShow(true);
    setTimeout(() => {
      setRevealModal(true);
    }, 0);
  }, []);

  const hideModal = useCallback(() => {
    setRevealModal(false);
    setTimeout(() => {
      setIsShow(false);
    }, MODAL_ANIMATED_TIME * 1000);
  }, []);

  return {
    isShow,
    revealModal,
    showModal,
    hideModal,
  };
};
