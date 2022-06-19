import { Button } from 'components/Button';
import { ModalLayout } from 'components/modal/ModalLayout';
import { ModalParams, ModalType } from 'constants/modal';
import { useShowModal } from 'hooks/useShowModal';
import { useCallback, useEffect, useState } from 'react';
import { ModalService } from 'services/ModalService';

export const AlertModal = () => {
  const { isShow, revealModal, showModal, hideModal } = useShowModal();
  const [state, setState] = useState<ModalParams[ModalType.Alert]>();

  const handleClose = useCallback(() => {
    state?.onCancel?.();
    hideModal();
  }, [hideModal, state]);

  const handleConfirm = useCallback(() => {
    state?.onConfirm?.();
    hideModal();
  }, [hideModal, state]);

  useEffect(() => {
    const listener = (show: boolean, params?: ModalParams[ModalType.Alert]) => {
      if (show) {
        showModal();
      } else {
        hideModal();
      }
      setState(params);
    };

    ModalService.addEventListener(ModalType.Alert, listener);

    return () => {
      ModalService.removeEventListener(ModalType.Alert);
    };
  }, [hideModal, showModal]);

  return (
    <ModalLayout isShow={isShow} revealModal={revealModal}>
      <div className="w-80 bg-white p-6 rounded-lg flex flex-col items-start">
        <p className="mb-3 text-left font-bold text-lg">{state?.title}</p>
        <p>{state?.description}</p>
        <div className="flex flex-row justify-end w-full">
          {state?.cancelText && <Button type="button" label={state?.cancelText} onClick={handleClose} />}
          <Button type="button" label={state?.confirmText || '확인'} onClick={handleConfirm} />
        </div>
      </div>
    </ModalLayout>
  );
};
