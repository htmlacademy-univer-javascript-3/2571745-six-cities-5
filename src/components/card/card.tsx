import { AccomodationOffer } from '../../types/offer';
import { Link } from 'react-router-dom';

type CardProps = {
  accomodationOffer: AccomodationOffer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
};

function Card({
  accomodationOffer,
  onMouseEnter,
  onMouseLeave,
}: CardProps): JSX.Element {
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseEnter(accomodationOffer.id)}
      onMouseLeave={onMouseLeave}
    >
      {accomodationOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${accomodationOffer.id}`}>
          <img
            className="place-card__image"
            src={accomodationOffer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{accomodationOffer.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${(accomodationOffer.rating / 5) * 100}%` }}
            ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${accomodationOffer.id}`}>
            {accomodationOffer.title}
          </Link>
        </h2>
        <p className="place-card__type">{accomodationOffer.type}</p>
      </div>
    </article>
  );
}

export default Card;
