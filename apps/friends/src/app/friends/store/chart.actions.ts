import { createAction, props } from '@ngrx/store';
import { AxisOptions } from '../friend-detail/friend-detail.constants';

/** Axis */
export const setYAxis = createAction(
  '[Chart] Set Y-Axis',
  props<{ yAxis: AxisOptions }>()
);
export const setXAxis = createAction(
  '[Chart] Set X-Axis',
  props<{ xAxis: AxisOptions }>()
);
