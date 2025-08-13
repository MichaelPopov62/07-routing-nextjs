/*асинхронний серверний компонент NotePreview.
Отримує id нотатки з параметрів маршруту.
Створює новий екземпляр QueryClient.
Виконує prefetchQuery — На сервері завантажує дані нотатки і кладе їх у кеш (prefetchQuery)..
 "Запаковує" кеш (dehydrate) у безпечний для передачі формат — це називається серіалізація кешу.
Серіалізація кешу = перетворення даних з внутрішнього формату бібліотеки у звичайний об'єкт (JSON),щоб передати його з сервера у браузер.
 Передати ці дані у HydrationBoundary і передасть їх у NotePreviewClient  щоб можна було показати без повторного запиту до сервера.*/

import { fetchNoteById } from '@/lib/api';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client';

type Props = {
  params: { id: string };
};

export default async function NotePreview({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
