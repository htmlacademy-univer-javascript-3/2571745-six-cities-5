import { useState } from 'react';
import { AccomodationOffer } from '../../types/offer';
import Card from '../card/card';

type OfferListProps = {
  offers: AccomodationOffer[];
};

function OfferList({ offers }: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Card accomodationOffer={offer} />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
