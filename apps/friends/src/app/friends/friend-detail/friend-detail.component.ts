import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { Friend } from '@dancoto/types';
import { Subscription } from 'rxjs';
import { AxisOptions, CHART_AXIS_OPTIONS } from './friend-detail.constants';

@Component({
  selector: 'dancoto-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendDetailComponent {
  @Input() friends: Friend[] = [];
  xAxis: AxisOptions = 'age';
  yAxis: AxisOptions = 'weight';
  options = CHART_AXIS_OPTIONS;
  subscriptions: Subscription[] = [];
  constructor(public element: ElementRef<HTMLElement>) {}
}
