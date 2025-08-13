/* клієнтський React-компонент Header, який відображає шапку сайту з посиланням на головну сторінку і меню тегів (TagsMenu). Він визначає активний тег з URL та змінює маршрут при виборі іншого тегу через next/navigation.*/

'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';
import css from './Header.module.css';
import { TagsMenu } from '@/components/TagsMenu/TagsMenu';

// const tags: string[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Header() {

  return (
    <header className={css.header}>
      <Link href="/">Home</Link>
      <TagsMenu
      
      />
    </header>
  );
}
