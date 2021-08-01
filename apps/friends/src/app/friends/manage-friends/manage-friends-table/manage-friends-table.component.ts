import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Friend } from '@dancoto/types';
import { MANAGE_FRIEND_DISPLAYED_FIELDS } from './manage-friends-table.constants';

@Component({
  selector: 'dancoto-manage-friends-table',
  templateUrl: './manage-friends-table.component.html',
  styleUrls: ['./manage-friends-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageFriendsTableComponent {
  @Input() dataSource!: Friend[];
  @Output() readonly manageFriendsTableDeleteFriend: EventEmitter<string> =
    new EventEmitter();
  displayedColumns = MANAGE_FRIEND_DISPLAYED_FIELDS;
}
