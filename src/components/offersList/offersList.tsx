import { useState } from 'react';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type OfferListProps = {
  onCardHover: (id: string | null) => void;
};

function OfferList({ onCardHover }: OfferListProps): JSX.Element {

  const currentCity = useSelector((state: RootState) => state.city);
  const sortType = useSelector((state: RootState) => state.sortType);
  const offers = useSelector((state: RootState) =>
    state.offersList.filter((offer) => offer.city.name === currentCity)
  );

  const cityOffers = offers.filter((offer) => offer.city.name === currentCity);

  const sortedOffers = [...cityOffers].sort((a, b) => {
    switch (sortType) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (offers.length === 0) {
    return <p>No offers available for {currentCity}</p>;
  }

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Card key={offer.id}
            accomodationOffer={offer}
            onMouseEnter={() => onCardHover(offer.id)}
            onMouseLeave={() => onCardHover(null)}
          />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
