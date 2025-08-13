/*клієнтський React-компонент, забезпечує інтерфейс для роботи з нотатками: перегляд, пошук, пагінація, створення нових нотаток.*/

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
import { Tag } from '@/lib/api';

const PER_PAGE = 10;
const MIN_LOADING_TIME = 100;

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
  tag: Tag | null;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };
  //завантаження нотаток через бібліотеку TanStack Query
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
  //  керування показом індикатора завантаження
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timeoutId = setTimeout(() => setShowLoader(false), MIN_LOADING_TIME);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);
  // пагінація
  const handlePageChange = (selected: number) => setCurrentPage(selected);
  // відкриття,закриття модального вікна для створення нотатки
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //  закриття модалки клавішею Escape
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
  // рендер компоненту
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* пошукове поле */}
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {/* пагінація, якщо більше 1 сторінки */}
        {!showLoader && isSuccess && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {/* кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create Note +
        </button>
      </header>
      {/* індикатор завантаження */}
      {showLoader && <Loader message="Interesting notes..." />}
      {/* повідомлення про помилку */}
      {!showLoader && isError && (
        <Loader
          message="There was a problem loading the enchanted notes"
          color="#D62727"
        />
      )}
      {/* список нотаток */}
      {!showLoader && isSuccess && data?.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {/* повідомлення про відсутність результатів пошуку */}
      {!showLoader &&
        isSuccess &&
        data?.notes.length === 0 &&
        searchQuery.trim() !== '' && (
          <p className={css.noResults}>Notation not found after the search</p>
        )}
      {/* модальне вікно з формою створення нотатки */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
