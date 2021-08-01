import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Friend } from '@dancoto/types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AxisOptions } from './friend-detail/friend-detail.constants';
import { setXAxis, setYAxis } from './store/chart.actions';
import { selectChartXAxis, selectChartYAxis } from './store/chart.selectors';
import { addFriend, deleteFriend, fetchFriends } from './store/friends.actions';
import { selectFriends } from './store/friends.selectors';
import { FriendsFeatureState } from './store/reducers';

@Component({
  selector: 'dancoto-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsContainerComponent implements OnInit {
  friends$: Observable<Friend[]> = this.friendsStore.pipe(
    select(selectFriends)
  );
  xAxis$: Observable<AxisOptions> = this.friendsStore.pipe(
    select(selectChartXAxis)
  );
  yAxis$: Observable<AxisOptions> = this.friendsStore.pipe(
    select(selectChartYAxis)
  );
  constructor(private friendsStore: Store<FriendsFeatureState>) {}

  ngOnInit(): void {
    this.friendsStore.dispatch(fetchFriends());
  }

  addFriend(friend: Friend) {
    this.friendsStore.dispatch(addFriend({ friend }));
  }

  deleteFriendById(id: string) {
    this.friendsStore.dispatch(deleteFriend({ id }));
  }

  changeXAxis(xAxis: AxisOptions) {
    this.friendsStore.dispatch(setXAxis({ xAxis }));
  }
  changeYAxis(yAxis: AxisOptions) {
    this.friendsStore.dispatch(setYAxis({ yAxis }));
  }
}
