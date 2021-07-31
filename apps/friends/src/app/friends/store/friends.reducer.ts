import { Friend } from '@dancoto/types';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addFriendSuccess,
  deleteFriendSuccess,
  fetchFriendsSuccess,
} from './friends.actions';

export interface FriendsState {
  friends: Friend[];
}

export const initialState: FriendsState = {
  friends: [],
};

const _friendsReducer = createReducer(
  initialState,
  on(fetchFriendsSuccess, (state, { friends }) => ({
    ...state,
    friends: [...friends],
  })),
  on(addFriendSuccess, (state, { friend }) => ({
    ...state,
    friends: [...state.friends, friend],
  })),
  on(deleteFriendSuccess, (state, { id }) => ({
    ...state,
    friends: state.friends.filter((friend) => friend.id !== id),
  }))
);

export function friendsReducer(state: FriendsState, action: Action) {
  return _friendsReducer(state, action);
}
