/*Цей файл — клієнтський React-компонент NotFoundMessage, який показує повідомлення про помилку 404 і через 3 секунди автоматично перенаправляє користувача на головну сторінку.*/

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './NotFoundMessage.module.css';

const NotFoundMessage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p className={css.description}>You will be redirected shortly...</p>
    </div>
  );
};

export default NotFoundMessage;
