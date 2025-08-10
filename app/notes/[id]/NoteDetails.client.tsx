/* клієнтський React-компонент NoteDetailsClient, який за параметром id з URL завантажує нотатку через react-query (функція fetchNoteById), відображає стан завантаження, помилки або деталі нотатки з датою оновлення чи створення, використовуючи стилі з CSS-модуля.*/

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetailsClient.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  // виконання вимоги: перевести  параметр id з рядка у число,
  const idNumber = id ? Number(id) : NaN;
  const isValidId = !isNaN(idNumber);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(idNumber.toString()),
    enabled: isValidId,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    const message = (error as Error)?.message || 'Error loading note.';
    return <p>Error: {message}</p>;
  }

  if (!note) return <p>Note not found.</p>;

  const formattedDate = note.updatedAt
    ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
    : note.createdAt
      ? `Created: ${new Date(note.createdAt).toLocaleString()}`
      : 'Date not available';

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
