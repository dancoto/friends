import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dancoto-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
