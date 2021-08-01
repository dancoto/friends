import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Friend } from '@dancoto/types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { deleteFriend } from '../store/friends.actions';
import { selectFriends } from '../store/friends.selectors';
import { FriendsFeatureState } from '../store/reducers';

@Component({
  selector: 'dancoto-manage-friends',
  templateUrl: './manage-friends.component.html',
  styleUrls: ['./manage-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageFriendsComponent implements OnInit {
  friends$!: Observable<Friend[]>;
  constructor(private friendsStore: Store<FriendsFeatureState>) {}

  ngOnInit(): void {
    this.friends$ = this.friendsStore.pipe(
      select(selectFriends),
      shareReplay(1)
    );
  }

  deleteFriendById(id: string) {
    this.friendsStore.dispatch(deleteFriend({ id }));
  }
}
