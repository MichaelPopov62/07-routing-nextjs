/*React-компонент NotesLayout, створює макет сторінки з боковою панеллю (sidebar) і основним контентом (children), розташованими поруч у флекс-контейнері з відступом між ними.Атрібут role покращує доступність і структуру документа*/

import React from 'react';
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section style={{ display: 'flex', gap: '20px' }}>
      <aside role="complementary">{sidebar}</aside>

      <div style={{ flex: 1 }}>{children}</div>
    </section>
  );
};

export default NotesLayout;
