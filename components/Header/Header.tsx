/* клієнтський React-компонент Header, який відображає шапку сайту з посиланням на головну сторінку і меню тегів (TagsMenu). Він визначає активний тег з URL та змінює маршрут при виборі іншого тегу через next/navigation.*/

'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';
import css from './Header.module.css';
import { TagsMenu } from '@/components/TagsMenu/TagsMenu';

const tags: string[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTag = useMemo(() => {
    const parts = pathname.split('/');
    if (parts.length >= 4) {
      return parts[3];
    }
    return null;
  }, [pathname]);

  const handleTagChange = (tag: string | null) => {
    if (!tag) {
      router.push('/notes/filter');
    } else {
      router.push(`/notes/filter/${tag}`);
    }
  };

  return (
    <header className={css.header}>
      <Link href="/">Home</Link>
      <TagsMenu
        tags={tags}
        activeTag={activeTag}
        onTagChange={handleTagChange}
      />
    </header>
  );
}
