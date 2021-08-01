import { setXAxis, setYAxis } from './chart.actions';
import * as fromReducer from './chart.reducer';
describe('ChartReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.chartReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('setYAxis action', () => {
    it('should update the YAxis', () => {
      const { initialState } = fromReducer;
      const yAxis = 'friends';
      const newState: fromReducer.ChartState = {
        xAxis: 'age',
        yAxis,
      };
      const action = setYAxis({ yAxis });
      const state = fromReducer.chartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('setXAxis action', () => {
    it('should update the XAxis', () => {
      const { initialState } = fromReducer;
      const xAxis = 'friends';
      const newState: fromReducer.ChartState = {
        yAxis: 'weight',
        xAxis,
      };

      const action = setXAxis({ xAxis });
      const state = fromReducer.chartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
