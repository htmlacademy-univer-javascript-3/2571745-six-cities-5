export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  
  export type AccomodationOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    rating: number;
    isPremium: boolean;
    isFavorite: boolean;
    location: Location;
    city: string;
    previewImage: string;
  };