import { Friend } from '@dancoto/types';
import { ActionReducerMap } from '@ngrx/store';
import { chartReducer, ChartState } from './chart.reducer';
import { friendsReducer } from './friends.reducer';

export const featureName = 'friendsFeature';

export interface FriendsFeatureState {
  friends: Friend[];
  chart: ChartState;
}

export const friendsFeatureReduder: ActionReducerMap<FriendsFeatureState> = {
  friends: friendsReducer,
  chart: chartReducer,
};
