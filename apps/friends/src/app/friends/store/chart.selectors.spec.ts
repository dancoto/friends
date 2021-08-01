import * as fromReducer from './chart.reducer';
import {
  selectChartState,
  selectChartXAxis,
  selectChartYAxis,
} from './chart.selectors';
import { FriendsFeatureState } from './reducers';

describe('ChartSelectors', () => {
  const initialState: Partial<FriendsFeatureState> = {
    chart: fromReducer.initialState,
  };

  it('should select chart state', () => {
    const result = selectChartState.projector(initialState);
    expect(result).toEqual(fromReducer.initialState);
  });

  it('should select the xAxis', () => {
    const result = selectChartXAxis.projector(fromReducer.initialState);
    expect(result).toEqual('age');
  });

  it('should select the yAxis', () => {
    const result = selectChartYAxis.projector(fromReducer.initialState);
    expect(result).toEqual('weight');
  });
});
