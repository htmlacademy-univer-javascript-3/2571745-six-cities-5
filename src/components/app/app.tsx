import MainPage from '../../pages/main-page.tsx/main-page';

type RentalOffersProps = {
  rentalOffersAmount: number;
};

function App({ rentalOffersAmount }: RentalOffersProps): JSX.Element {
  return <MainPage rentalOffersAmount={rentalOffersAmount} />;
}

export default App;
