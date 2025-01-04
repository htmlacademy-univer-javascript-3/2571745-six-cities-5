import { AccomodationOffer } from '../types/offer';
import { AuthorizationStatus } from '../const';

export interface AppState {
  city: string;
  offersList: AccomodationOffer[];
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  sortType: string;
}
