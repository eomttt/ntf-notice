export enum ModalType {
  Alert = 'Alert',
}

export interface ModalParams {
  [ModalType.Alert]: {
    title?: string;
    description?: string;
    confirmText?: string;
    onConfirm?: () => void;
    cancelText?: string;
    onCancel?: () => void;
  };
}
