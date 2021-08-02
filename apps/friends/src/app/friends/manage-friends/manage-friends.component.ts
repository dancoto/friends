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

  /**
   * Fetch friends form the store
   * Share replay to not double fire by async pipe in template
   *
   * @memberof ManageFriendsComponent
   */
  ngOnInit(): void {
    this.friends$ = this.friendsStore.pipe(
      select(selectFriends),
      shareReplay(1)
    );
  }

  /**
   * Dispatch action to delete friend by ID
   *
   * @param {string} id
   * @memberof ManageFriendsComponent
   */
  deleteFriendById(id: string) {
    this.friendsStore.dispatch(deleteFriend({ id }));
  }
}
