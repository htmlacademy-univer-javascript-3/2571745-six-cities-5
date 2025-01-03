import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCityAction } from '../../action';
import { RootState } from '../../store';

const cities = ['Amsterdam', 'Paris', 'Cologne', 'Brussels', 'Hamburg', 'Dusseldorf'];

const CityList: React.FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);

  const handleCityChange = (city: string) => {
    dispatch(setCurrentCityAction(city));
  };

  return (
    <ul>
      {cities.map((city) => (
        <li key={city}>
          <button
            onClick={() => handleCityChange(city)}
            style={{ fontWeight: city === currentCity ? 'bold' : 'normal' }}
          >
            {city}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CityList;
