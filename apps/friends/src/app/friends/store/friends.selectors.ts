import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FriendsState } from './friends.reducer';

export const selectFriendsState =
  createFeatureSelector<FriendsState>('friends');

export const selectFriends = createSelector(
  selectFriendsState,
  (state: FriendsState) => state.friends
);
