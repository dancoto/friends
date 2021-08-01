import { createFeatureSelector } from '@ngrx/store';
import * as fromFriends from './reducers';
export const selectFriendsFeature =
  createFeatureSelector<fromFriends.FriendsFeatureState>(
    fromFriends.featureName
  );
