import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FriendsService } from '../friends.service';
import {
  addFriend,
  addFriendError,
  addFriendSuccess,
  deleteFriend,
  deleteFriendError,
  deleteFriendSuccess,
  fetchFriends,
  fetchFriendsError,
  fetchFriendsSuccess,
} from './friends.actions';
@Injectable()
export class FriendsEffects {
  // Though we have no API here, simulating a fetch fresh in case we had something stored server side
  fetchFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchFriends),
      mergeMap(() =>
        this.friendsService.fetchFriends().pipe(
          map((friends) => fetchFriendsSuccess({ friends })),
          catchError(() => of(fetchFriendsError()))
        )
      )
    )
  );

  addFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFriend),
      mergeMap(({ friend }) =>
        this.friendsService.addFriend(friend).pipe(
          map((id) =>
            !!id
              ? addFriendSuccess({ friend: { ...friend, id } })
              : addFriendError()
          ),
          catchError(() => of(addFriendError()))
        )
      )
    )
  );

  deleteFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFriend),
      mergeMap(({ id }) =>
        this.friendsService.deleteFriend(id).pipe(
          map((success) =>
            success ? deleteFriendSuccess({ id }) : deleteFriendError()
          ),
          catchError(() => of(deleteFriendError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private friendsService: FriendsService
  ) {}
}
