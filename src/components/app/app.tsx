import MainPage from '../../pages/main-page.tsx/main-page';

type MainPageProps = {
  rentalOffers: number;
};

function App({ rentalOffers }: MainPageProps): JSX.Element {
  return <MainPage rentalOffers={rentalOffers} />;
}

export default App;
