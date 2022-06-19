import { ModalParams, ModalType } from 'constants/modal';

type Listeners = {
  [key in ModalType]?: EventListener<key> | null;
};

type EventListener<T extends ModalType> = (isShow: boolean, p?: ModalParams[T]) => void;

export class ModalService {
  private static listeners: Listeners = {};

  static show<T extends ModalType>(name: T, params?: ModalParams[T]) {
    const listener = this.listeners[name] as EventListener<T>;
    listener?.(true, params);
  }

  static hide<T extends ModalType>(name: T, params?: ModalParams[T]) {
    const listener = this.listeners[name] as EventListener<T>;
    listener?.(false, params);
  }

  static addEventListener<T extends ModalType>(eventName: T, listener: Listeners[T]) {
    this.listeners[eventName] = listener;
  }

  static removeEventListener(eventName: ModalType) {
    this.listeners[eventName] = null;
  }
}
