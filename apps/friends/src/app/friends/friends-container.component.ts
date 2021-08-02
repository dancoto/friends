import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Friend } from '@dancoto/types';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AxisOptions } from './friend-detail/friend-detail.constants';
import { ManageFriendsComponent } from './manage-friends/manage-friends.component';
import { setXAxis, setYAxis } from './store/chart.actions';
import { selectChartXAxis, selectChartYAxis } from './store/chart.selectors';
import { addFriend, fetchFriends } from './store/friends.actions';
import { selectFriends } from './store/friends.selectors';
import { FriendsFeatureState } from './store/reducers';

@Component({
  selector: 'dancoto-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsContainerComponent implements OnInit {
  friends$!: Observable<Friend[]>;
  xAxis$!: Observable<AxisOptions>;
  yAxis$!: Observable<AxisOptions>;
  constructor(
    public matDialog: MatDialog,
    private friendsStore: Store<FriendsFeatureState>
  ) {}

  /**
   * Setup selects from store and dispatch to fetch friends
   *
   * @memberof FriendsContainerComponent
   */
  ngOnInit(): void {
    this.friends$ = this.friendsStore.pipe(select(selectFriends));
    this.xAxis$ = this.friendsStore.pipe(select(selectChartXAxis));
    this.yAxis$ = this.friendsStore.pipe(select(selectChartYAxis));
    this.friendsStore.dispatch(fetchFriends());
  }

  /**
   * Dispatch an addFriend to the store
   *
   * @param {Friend} friend
   * @memberof FriendsContainerComponent
   */
  addFriend(friend: Friend) {
    this.friendsStore.dispatch(addFriend({ friend }));
  }

  /**
   * Dispatch a setXAxis to the store
   *
   * @param {AxisOptions} xAxis
   * @memberof FriendsContainerComponent
   */
  changeXAxis(xAxis: AxisOptions) {
    this.friendsStore.dispatch(setXAxis({ xAxis }));
  }

  /**
   * Dispatch a setYAxis to the store
   *
   * @param {AxisOptions} yAxis
   * @memberof FriendsContainerComponent
   */
  changeYAxis(yAxis: AxisOptions) {
    this.friendsStore.dispatch(setYAxis({ yAxis }));
  }

  /**
   * Open a matDialog to be able to look at and delete friends
   *
   * @memberof FriendsContainerComponent
   */
  manageFriends() {
    this.matDialog.open(ManageFriendsComponent, {
      minWidth: 600,
      autoFocus: false,
    });
  }
}
