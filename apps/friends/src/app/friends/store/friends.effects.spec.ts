import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Friend } from '@dancoto/types';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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
import { FriendsEffects } from './friends.effects';

describe('FriendsEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: FriendsEffects;
  let friendsService: FriendsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendsEffects, provideMockActions(() => actions$)],
    });
    effects = TestBed.inject<FriendsEffects>(FriendsEffects);
    friendsService = TestBed.inject(FriendsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFriends', () => {
    it('should fetch data on fetchFriends', fakeAsync(() => {
      jest.spyOn(friendsService, 'fetchFriends').mockReturnValueOnce(of([]));

      actions$ = of(fetchFriends);

      effects.fetchFriends$.subscribe((action) => {
        expect(action).toEqual(fetchFriendsSuccess({ friends: [] }));
      });
      tick(200);
    }));

    it('should throw error on an api error', fakeAsync(() => {
      const error = {
        status: 500,
        message: 'Internal Server Error',
      };
      jest
        .spyOn(friendsService, 'fetchFriends')
        .mockReturnValueOnce(throwError(error));

      actions$ = of(fetchFriends);

      effects.fetchFriends$.subscribe((action) => {
        expect(action).toEqual(
          showNotification({ message: 'Error fetching friends' })
        );
      });
      tick(200);
    }));
  });

  describe('addFriend', () => {
    it('should return a friend with a unique ID on success ', fakeAsync(() => {
      const uniqueId = uuidv4();
      const friend: Friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
      };
      jest.spyOn(friendsService, 'addFriend').mockReturnValueOnce(of(uniqueId));

      actions$ = of(addFriend({ friend }));

      effects.addFriend$.subscribe((action) => {
        expect(action).toEqual(
          addFriendSuccess({ friend: { ...friend, id: uniqueId } })
        );
      });
      tick(200);
    }));

    it('should throw error if we get a null id back', fakeAsync(() => {
      const error = {
        status: 500,
        message: 'Internal Server Error',
      };
      const friend: Friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
      };
      jest
        .spyOn(friendsService, 'addFriend')
        .mockReturnValueOnce(of(null) as any);

      actions$ = of(addFriend({ friend }));

      effects.addFriend$.subscribe((action) => {
        expect(action).toEqual(
          showNotification({ message: 'Error adding friend' })
        );
      });
      tick(200);
    }));

    it('should throw error on an api error', fakeAsync(() => {
      const error = {
        status: 500,
        message: 'Internal Server Error',
      };
      const friend: Friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
      };
      jest
        .spyOn(friendsService, 'addFriend')
        .mockReturnValueOnce(throwError(error));

      actions$ = of(addFriend({ friend }));

      effects.addFriend$.subscribe((action) => {
        expect(action).toEqual(
          showNotification({ message: 'Error adding friend' })
        );
      });
      tick(200);
    }));
  });

  describe('deleteFriend', () => {
    it('should return id of deleted friend on successful delete', fakeAsync(() => {
      const id = uuidv4();
      jest.spyOn(friendsService, 'deleteFriend').mockReturnValueOnce(of(true));

      actions$ = of(deleteFriend({ id }));

      effects.deleteFriend$.subscribe((action) => {
        expect(action).toEqual(deleteFriendSuccess({ id }));
      });
      tick(200);
    }));

    it('should throw error on false from API', fakeAsync(() => {
      const id = uuidv4();
      jest.spyOn(friendsService, 'deleteFriend').mockReturnValueOnce(of(false));

      actions$ = of(deleteFriend({ id }));

      effects.deleteFriend$.subscribe((action) => {
        expect(action).toEqual(
          showNotification({ message: 'Error deleting friend' })
        );
      });
      tick(200);
    }));

    it('should throw error on an api error', fakeAsync(() => {
      const id = uuidv4();
      const error = {
        status: 500,
        message: 'Internal Server Error',
      };
      jest
        .spyOn(friendsService, 'deleteFriend')
        .mockReturnValueOnce(throwError(error));

      actions$ = of(deleteFriend({ id }));

      effects.deleteFriend$.subscribe((action) => {
        expect(action).toEqual(
          showNotification({ message: 'Error deleting friend' })
        );
      });
      tick(200);
    }));
  });
});
