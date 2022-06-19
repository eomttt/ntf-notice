import { AlertModal } from 'components/modal/AlertModal';
import { Modal } from 'components/modal/Modal';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Modal>
        <AlertModal />
      </Modal>
    </>
  );
}

export default MyApp;
