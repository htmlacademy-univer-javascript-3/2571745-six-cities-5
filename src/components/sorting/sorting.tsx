import { useState } from 'react';

type SortingProps = {
  currentSort: string;
  onSortChange: (sortType: string) => void;
};

function Sorting({ currentSort, onSortChange }: SortingProps): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortingOptions = [
    { type: 'popular', label: 'Popular' },
    { type: 'price-asc', label: 'Price: low to high' },
    { type: 'price-desc', label: 'Price: high to low' },
    { type: 'rating-desc', label: 'Top rated first' },
  ];

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectSort = (value: string) => {
    onSortChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleDropdown}
      >
        {sortingOptions.find((option) => option.type === currentSort)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isDropdownOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {sortingOptions.map((option) => (
            <li
              key={option.type}
              className={`places__option ${
                currentSort === option.type ? 'places__option--active' : ''
              }`}
              tabIndex={0}
              onClick={() => handleSelectSort(option.type)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default Sorting;
