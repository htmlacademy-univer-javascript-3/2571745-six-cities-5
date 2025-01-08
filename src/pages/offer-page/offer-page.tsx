import CommentForm from '../../components/review-form/review-form';
import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadOfferDetailsAction, loadReviewsAction } from '../../action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store';
import { useState } from 'react';
import axios from 'axios';
import { createAPI } from '../../services/api';
import { selectOfferPageData } from '../../selector';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import Card from '../../components/card/card';
import { useNavigate } from 'react-router-dom';

function OfferPage(): JSX.Element {
  const { id: offerId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.isLoadingCurrentOffer);
  const { currentOffer, reviews, nearbyOffers} = useSelector(selectOfferPageData);
  console.log("Offer details:", currentOffer);
  console.log("Nearby offers:", nearbyOffers);
  const navigate = useNavigate();

  useEffect(() => {
    if (offerId) {
      dispatch(loadOfferDetailsAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const { id, title, city, location, price, rating, isPremium, isFavorite, previewImage, type, images, bedrooms, maxAdults, goods, host, description } = currentOffer;

  const handleNearbyOfferClick = (nearbyOfferId: string) => {
    navigate(`/offer/${nearbyOfferId}`);
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images?.map((image, index) => (
                <div key={index} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}              
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${
                    isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                <span style={{ width: `${(rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods?.map((good, index) => (
                    <li key={index} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                <div
                  className={`offer__avatar-wrapper ${
                    host?.isPro
                      ? 'offer__avatar-wrapper--pro'
                      : ''
                  } user__avatar-wrapper`}
                >
                  <img
                    className="offer__avatar user__avatar"
                    src={host?.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                  <span className="offer__user-name">{host?.name}</span>
                  {host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  {description?.split('\n').map((paragraph, index) => (
                    <p key={index} className="offer__text">
                      {paragraph}
                    </p>
                  ))}                 
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="img/avatar-max.jpg"
                          width="54"
                          height="54"
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="reviews__user-name">Max</span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{ width: '80%' }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river
                        by the unique lightness of Amsterdam. The building is
                        green and from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">
                        April 2019
                      </time>
                    </div>
                  </li>
                </ul>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
            {nearbyOffers.map((offer) => (
              <Card
                key={offer.id}
                accomodationOffer={offer}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                onTitleClick={() => handleNearbyOfferClick(offer.id)}
              />
            ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
