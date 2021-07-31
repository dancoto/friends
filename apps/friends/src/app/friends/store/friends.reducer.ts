import { Friend } from '@dancoto/types';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addFriendSuccess,
  deleteFriendSuccess,
  fetchFriendsSuccess,
} from './friends.actions';
// Ideally if this feature had more, we would have a proper feature object for more
// properties in here, but since just friends, leaving it as an array
export const initialState: Friend[] = [];

const _friendsReducer = createReducer(
  initialState,
  on(fetchFriendsSuccess, (state, { friends }) => [...friends]),
  on(addFriendSuccess, (state, { friend }) => [...state, friend]),
  on(deleteFriendSuccess, (state, { id }) =>
    state.filter((friend) => friend.id !== id)
  )
);

export function friendsReducer(state: Friend[], action: Action) {
  return _friendsReducer(state, action);
}
