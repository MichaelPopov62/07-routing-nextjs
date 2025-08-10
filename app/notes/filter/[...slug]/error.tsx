/*клієнтський React-компонент NotesListError, який відображає повідомлення про помилку при завантаженні списку нотаток і містить кнопку для повторної спроби завантаження.*/

'use client';

import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function NotesListError({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
