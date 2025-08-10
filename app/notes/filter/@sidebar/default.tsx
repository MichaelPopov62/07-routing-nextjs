/* React-компонент SidebarNotes, який відображає список тегів у вигляді меню з посиланнями для фільтрації нотаток за тегами.*/

import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            scroll={false} // щоб не стрибала сторінка
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
