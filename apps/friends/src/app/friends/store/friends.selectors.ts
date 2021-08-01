import { createSelector } from '@ngrx/store';
import * as fromFriendsFeature from './reducers';
import { selectFriendsFeature } from './selectors';
export const selectFriends = createSelector(
  selectFriendsFeature,
  (state: fromFriendsFeature.FriendsFeatureState) => state.friends
);
