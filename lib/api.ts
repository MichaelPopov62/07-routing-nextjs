/*Цей файл — API-сервіс для роботи з нотатками, який через HTTP-запити (axios) забезпечує отримання, створення і видалення нотаток на бекенді з використанням авторизаційного токена. Він також містить типи і інтерфейси для нотаток і параметрів запитів.*/

import axios from 'axios';

import type { AxiosError } from 'axios';
import type { Note } from '@/types/note';

// Токен авторизації
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// Базова URL-адреса бекенду
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://notehub-public.goit.study/api';

// Приклад статичного масиву тегів
export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

// Інтерфейс параметрів для отримання нотаток через API
export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  tag?: Tag;
}

// Інтерфейс даних нової нотатки
export interface DataNewNotes {
  title: string;
  content: string;
  tag: Tag;
}

// Інтерфейс відповіді сервера при отриманні нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag?: Tag;
  tags?: Tag[];
}

// Функція отримання нотаток з бекенду
export async function fetchNotes({
  page = 1,
  perPage = 10,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
    search,
  };
  // Додаємо тег тільки якщо він переданий
  if (tag) {
    params.tag = tag;
  }

  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params,
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
  // notes: res.data.notes,
  // totalPages: res.data.totalPages ?? 1,
  // tag: res.data.tag,
  // tags: res.data.tags,
}

// Функція отримання нотатки за ID
export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    // Глобальна критична помилка (або відсутність відповіді)
    if (!axiosError.response || axiosError.response.status >= 500) {
      throw new Error(axiosError.message || 'Server error while fetching note');
    }

    // Локальна помилка
    const message =
      axiosError.response?.data?.message || `Note with id ${id} not found`;

    throw new Error(message);
  }
}

// Функція створення нової нотатки
export async function createNote(newNote: DataNewNotes): Promise<Note> {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

// Функція видалення нотатки за ID
export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
