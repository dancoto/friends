import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Friend } from '@dancoto/types';
import { AxisOptions } from './friend-detail.constants';

@Component({
  selector: 'dancoto-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendDetailComponent {
  @Input() friends!: Friend[];
  @Input() xAxis!: AxisOptions;
  @Input() yAxis!: AxisOptions;

  @Output() readonly friendDetailXAxisChange: EventEmitter<AxisOptions> =
    new EventEmitter();
  @Output() readonly friendDetailYAxisChange: EventEmitter<AxisOptions> =
    new EventEmitter();
  @Output() readonly friendDetailManageFriends: EventEmitter<void> =
    new EventEmitter();
}
