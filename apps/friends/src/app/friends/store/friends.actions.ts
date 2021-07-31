import { Friend } from '@dancoto/types';
import { createAction, props } from '@ngrx/store';

/** FETCH */
export const fetchFriends = createAction('[Friend] Fetch Friends');

export const fetchFriendsSuccess = createAction(
  '[Friend /API] Fetch Friends Success',
  props<{ friends: Friend[] }>()
);

export const fetchFriendsError = createAction(
  '[Friend /API] Fetch Friends Error'
);

/** ADD */
export const addFriend = createAction(
  '[Friend] Add Friend',
  props<{ friend: Friend }>()
);

export const addFriendSuccess = createAction(
  '[Friend /API] Add Friend Success',
  props<{ friend: Friend }>()
);

export const addFriendError = createAction('[Friend /API] Add Friend Error');

/** DELETE */
export const deleteFriend = createAction(
  '[Friend] Delete Friend',
  props<{ id: string }>()
);

export const deleteFriendSuccess = createAction(
  '[Friend /API] Delete Friend Success',
  props<{ id: string }>()
);

export const deleteFriendError = createAction(
  '[Friend /API] Delete Friend Error'
);
