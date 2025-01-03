export interface AccomodationOffer {
  id: string;
  title: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
}
