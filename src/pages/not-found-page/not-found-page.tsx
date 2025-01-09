import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <section className="game__screen">
        <h1>404. Page not found</h1>
        <Link to={AppRoute.Main}>Вернуться на главную</Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
