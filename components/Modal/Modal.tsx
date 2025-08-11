/* клієнтський React-компонент Modal, який відображає модальне вікно з затемненим фоном, показує переданий вміст (children) і має кнопку для закриття, що повертає користувача на попередню сторінку за допомогою навігації Next.js.*/

'use client';

import { useRouter } from 'next/navigation';
import css from '@/components/Modal/Modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button
          className={css.closeButton}
          onClick={close}
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
