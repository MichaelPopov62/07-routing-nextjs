/*  клієнтський компонент React, який є глобальним обробником помилок для маршруту /notes/[id]. Він відображає повідомлення про помилку при проблемах із завантаженням нотатки і пропонує кнопку для повторної спроби завантаження.
 */

'use client';

import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function NoteDetailsError({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
