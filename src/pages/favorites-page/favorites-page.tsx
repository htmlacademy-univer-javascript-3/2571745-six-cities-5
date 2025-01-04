import Card from "../../components/card/card";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../components/header/header";

function FavoritesPage(): JSX.Element {

  const favoriteOffers = useSelector((state: RootState) =>
    state.offersList.filter((offer) => offer.isFavorite)
  );

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffers.map((favorite) => (
                  <li key={favorite.id} className="favorites__locations-items">
                    <div className="favorites__locations">
                      <div className="favorites__locations-item">
                        <Card accomodationOffer={favorite} />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
