import { createSelector } from '@ngrx/store';
import { ChartState } from './chart.reducer';
import * as fromFriendsFeature from './reducers';
import { selectFriendsFeature } from './selectors';

export const selectChartState = createSelector(
  selectFriendsFeature,
  (state: fromFriendsFeature.FriendsFeatureState) => state.chart
);

export const selectChartYAxis = createSelector(
  selectChartState,
  (state: ChartState) => state.yAxis
);

export const selectChartXAxis = createSelector(
  selectChartState,
  (state: ChartState) => state.xAxis
);
