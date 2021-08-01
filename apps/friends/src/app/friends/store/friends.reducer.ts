import { Friend } from '@dancoto/types';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addFriendSuccess,
  deleteFriendSuccess,
  fetchFriendsSuccess,
} from './friends.actions';
export const initialState: Friend[] = [];

const _friendsReducer = createReducer(
  initialState,
  on(fetchFriendsSuccess, (state, { friends }) => [...friends]),
  on(addFriendSuccess, (state, { friend }) => [...state, friend]),
  on(deleteFriendSuccess, (state, { id }) =>
    state.filter((friend) => friend.id !== id)
  )
);

export function friendsReducer(
  state: Friend[] | undefined,
  action: Action
): Friend[] {
  return _friendsReducer(state, action);
}
