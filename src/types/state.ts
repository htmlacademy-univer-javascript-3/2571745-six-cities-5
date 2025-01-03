import { AccomodationOffer } from '../types/offer';

export interface AppState {
  city: string;
  offersList: AccomodationOffer[];
  isLoading: boolean;
  error: string | null;
}
