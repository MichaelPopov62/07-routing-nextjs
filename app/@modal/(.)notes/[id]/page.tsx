/*асинхронний React-компонент NotePreview, який за ID (params.id) завантажує нотатку через fetchNoteById і відображає її в модальному вікні (Modal) з заголовком і текстом нотатки.*/

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}
