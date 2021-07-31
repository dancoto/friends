import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Friend } from '@dancoto/types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { addFriend, deleteFriend, fetchFriends } from './store/friends.actions';
import { FriendsState } from './store/friends.reducer';
import { selectFriends } from './store/friends.selectors';

@Component({
  selector: 'dancoto-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsContainerComponent implements OnInit {
  friends$: Observable<Friend[]> = this.friendsStore.pipe(
    select(selectFriends),
    tap((friends) => console.log(friends))
  );
  constructor(private friendsStore: Store<FriendsState>) {}

  ngOnInit(): void {
    this.friendsStore.dispatch(fetchFriends());
  }

  addFriend(friend: Friend) {
    this.friendsStore.dispatch(addFriend({ friend }));
  }

  deleteFriend(id: string) {
    this.friendsStore.dispatch(deleteFriend({ id }));
  }
}
