 /* клієнтський React-компонент TagsMenu, який відображає випадаюче меню тегів для фільтрації нотаток, дозволяє відкривати/закривати список тегів і підсвічує активний тег.*/


'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

type Tag = string;

const allTags: Tag[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export const TagsMenu = () => {
  const [activeTag, setActiveTag] = useState<Tag>('All');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = (tag: Tag) => {
    setActiveTag(tag);
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button
        type="button"
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {allTags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={() => closeMenu(tag)}
                className={`${css.menuLink} ${activeTag === tag ? css.active : ''}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
