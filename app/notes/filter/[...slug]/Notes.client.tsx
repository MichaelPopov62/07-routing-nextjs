/*клієнтський React-компонент NotesClient, який реалізує інтерфейс для перегляду, пошуку, пагінації та створення нотаток. Він завантажує список нотаток з сервера з урахуванням сторінки, пошукового запиту і тегу, показує індикатор завантаження, обробляє помилки, відкриває форму створення нотатки у модальному вікні та підтримує debounce для пошуку.*/

'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import css from './page.module.css';
import { Tag } from '@/lib/api'; // або звідки у тебе оголошений тип

const PER_PAGE = 10;
const MIN_LOADING_TIME = 100;

interface NotesClientProps {
  initialNotes?: FetchNotesResponse;
  tag: Tag | null;
  tags?: string[];
  notes?: string;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', currentPage, searchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: searchQuery,
        tag: tag ?? undefined,
      }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    initialData:
      currentPage === 1 && searchQuery === '' ? initialNotes : undefined,
  });

  // Мінімальний час відображення лоадера
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timeoutId = setTimeout(() => setShowLoader(false), MIN_LOADING_TIME);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const handlePageChange = (selected: number) => setCurrentPage(selected);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Закриття модалки по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
        {!showLoader && isSuccess && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create Note +
        </button>
      </header>

      {showLoader && <Loader message="Interesting notes..." />}
      {!showLoader && isError && (
        <Loader
          message="There was a problem loading the enchanted notes"
          color="#D62727"
        />
      )}
      {!showLoader && isSuccess && data?.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {!showLoader &&
        isSuccess &&
        data?.notes.length === 0 &&
        searchQuery.trim() !== '' && (
          <p className={css.noResults}>Notation not found after the search</p>
        )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
