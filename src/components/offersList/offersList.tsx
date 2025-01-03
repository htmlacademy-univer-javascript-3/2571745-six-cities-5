import { useState } from 'react';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


function OfferList(): JSX.Element {

  const currentCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) =>
    state.offersList.filter((offer) => offer.city.name === currentCity)
  );

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
