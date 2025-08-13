/* клієнтський React-компонент NotePreviewClient.
 Отримує id нотатки через пропси.
Використовує TanStack Query (useQuery) для завантаження даних нотатки з бекенду (fetchNoteById).
Показує модальне вікно (Modal) із вмістом нотатки(трете повернення), повідомленням про завантаження(перше повернення), також про помилку(друге повернення).
Дає можливість закрити модальне вікно, повернувшись на попередню сторінку через router.back().*/

'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css';

type Note = {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt?: string;
};

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <button
          className={css.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          Close
        </button>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Failed to load note.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <button className={css.button} onClick={handleClose}>
        Close
      </button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      {note.tag && <p>Tag: {note.tag}</p>}
      {note.createdAt && (
        <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
      )}
    </Modal>
  );
}
