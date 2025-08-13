/* це серверний асинхронний компонент Next.js, який:
отримує параметр URL (тег нотаток),
завантажує список нотаток з API з урахуванням цього тегу (фільтрація),
передає отримані дані в клієнтський компонент NotesClient для відображення.

*/

import NotesClient from './Notes.client';
import { Tag, tags } from '@/lib/api';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPage({ params }: PageProps) {
  //обробка маршруту
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0];
  // Якщо тег є в масиві tags і не "All", берем його, інакше undefined (без фільтра)
  const tag: Tag | undefined =
    rawTag && rawTag !== 'All' && tags.includes(rawTag as Tag)
      ? (rawTag as Tag)
      : undefined;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  //  Якщо є тег, додаю його до URL, інакше просто базовий URL.encodeURIComponent -для безпечної передачі тегів з будь-якими символами в URL.
  const url = tag
    ? `${baseUrl}/notes?tag=${encodeURIComponent(tag)}`
    : `${baseUrl}/notes`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  const notes = await res.json();

  return <NotesClient initialNotes={notes} tag={tag ?? null} />;
}
