/* Серверний асинхронний компонент NoteDetailsPage за ID нотатки виконує попереднє завантаження даних (fetchNoteById) через React Query і передає їх у клієнтський компонент NoteDetailsClient через гідратацію (HydrationBoundary), що дозволяє швидко та ефективно відрендерити контент без зайвих запитів.*/

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
