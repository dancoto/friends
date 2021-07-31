import { Friend } from '@dancoto/types';
import { v4 as uuidv4 } from 'uuid';
import {
  addFriendSuccess,
  deleteFriendSuccess,
  fetchFriendsSuccess,
} from './friends.actions';
import * as fromReducer from './friends.reducer';
describe('FriendsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('fetchFriendsSuccess action', () => {
    it('should retrieve all books and update the state', () => {
      const { initialState } = fromReducer;
      const friends = [
        {
          name: 'Daniel Coto',
          friends: 3,
          age: 100,
          weight: 140,
          id: uuidv4(),
        },
      ];
      const newState: Friend[] = friends;
      const action = fetchFriendsSuccess({ friends });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('addFriendSuccess action', () => {
    it('should add a new friend to the state', () => {
      const { initialState } = fromReducer;
      const id = uuidv4();
      const friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
        id: id,
      };

      const newState: Friend[] = [friend];
      const action = addFriendSuccess({ friend });
      const state = fromReducer.friendsReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('deleteFriendSuccess action', () => {
    it('should remove a friend from the state by id', () => {
      const id = uuidv4();
      const friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
        id: id,
      };

      const existingState: Friend[] = [friend];

      const newState: Friend[] = [];
      const action = deleteFriendSuccess({ id });
      const state = fromReducer.friendsReducer(existingState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
