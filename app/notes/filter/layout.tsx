/* React-компонент NotesLayout, який створює макет сторінки з боковою панеллю (sidebar) для меню тегів і основним контентом (children) для відображення відфільтрованих нотаток, розташованими поруч із відступами та стилями.*/

import React from 'react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section style={{ display: 'flex', gap: '20px', padding: 10 }}>
      {/* Сайдбар з меню тегів */}
      <aside
        style={{ minWidth: 200, backgroundColor: '#666666', padding: '10px' }}
      >
        {sidebar}
      </aside>

      {/* Основний контент — відфільтровані нотатки */}
      <main style={{ flexGrow: 1 }}>{children}</main>
    </section>
  );
};

export default NotesLayout;
