/* клієнтський React-компонент TagsMenu, який відображає випадаюче меню тегів для фільтрації нотаток, дозволяє відкривати/закривати список тегів і підсвічує активний тег.*/

'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

type Tag = string;

interface TagsMenuProps {
  tags: Tag[];
  activeTag: Tag | null;
  onTagChange: (tag: string | null) => void;
}

export const TagsMenu: React.FC<TagsMenuProps> = ({ tags, activeTag }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

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
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={closeMenu}
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
