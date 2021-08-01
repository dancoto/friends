import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { showNotification } from '../../core/notifications/notifications.actions';
import { FriendsService } from '../friends.service';
import {
  addFriend,
  addFriendSuccess,
  deleteFriend,
  deleteFriendSuccess,
  fetchFriends,
  fetchFriendsSuccess,
} from './friends.actions';
@Injectable()
export class FriendsEffects {
  // Though we have no API here, simulating a fresh fetch in case we had something stored server side

  fetchFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchFriends),
      mergeMap(() =>
        this.friendsService.fetchFriends().pipe(
          map((friends) => fetchFriendsSuccess({ friends })),
          catchError(() =>
            of(showNotification({ message: 'Error fetching friends' }))
          )
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
              : showNotification({ message: 'Error adding friend' })
          ),
          catchError(() =>
            of(showNotification({ message: 'Error adding friend' }))
          )
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
            success
              ? deleteFriendSuccess({ id })
              : showNotification({ message: 'Error deleting friend' })
          ),
          catchError(() =>
            of(showNotification({ message: 'Error deleting friend' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private friendsService: FriendsService
  ) {}
}
