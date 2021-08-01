import { Action, createReducer, on } from '@ngrx/store';
import { AxisOptions } from '../friend-detail/friend-detail.constants';
import { setXAxis, setYAxis } from './chart.actions';

export interface ChartState {
  xAxis: AxisOptions;
  yAxis: AxisOptions;
}
export const initialState: ChartState = {
  xAxis: 'age',
  yAxis: 'weight',
};

const _chartReducer = createReducer(
  initialState,
  on(setYAxis, (state, { yAxis }) => ({ ...state, yAxis })),
  on(setXAxis, (state, { xAxis }) => ({ ...state, xAxis }))
);

export function chartReducer(state: ChartState | undefined, action: Action) {
  return _chartReducer(state, action);
}
