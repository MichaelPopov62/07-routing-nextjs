// резервний компонент сторінки помилки 404, який Next.js автоматично рендерить, коли користувач переходить на неіснуючий шлях.

import NotFoundMessage from '../components/NotFoundMessage/NotFoundMessage';

export default function NotFound() {
  return <NotFoundMessage />;
}
