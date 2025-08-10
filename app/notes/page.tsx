/*серверний компонент NotesPage, який завантажує початковий список нотаток, виконує їхнє попереднє завантаження (гідрацію) через React Query і передає ці дані в клієнтський компонент Notes всередині провайдера TanStackProvider для швидкого та ефективного рендерингу.*/

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Notes from './filter/[...slug]/Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();
  // initialNotes - початкові дані нотаток, отримані на сервері для гідрації
  const initialNotes = await fetchNotes({
    page: 1,
    perPage: 10,
    search: '',
    tag: 'Todo',
  });

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => Promise.resolve(initialNotes),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <Notes initialNotes={initialNotes} tag={null} />
    </TanStackProvider>
  );
}
