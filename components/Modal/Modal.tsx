/* клієнтський React-компонент Modal, який відображає модальне вікно з затемненим фоном, показує переданий вміст (children) і має кнопку для закриття, що повертає користувача на попередню сторінку за допомогою навігації Next.js.*/

'use client';

import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
