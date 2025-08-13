/* React-компонент, який відображає бокове меню з тегами для фільтрації нотаток.
SidebarNotes дозволяє користувачеві фільтрувати нотатки за тегами,*/

import Link from 'next/link';
import css from './SidebarNotes.module.css';

//Список тегів
const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    //Рендер списку
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
