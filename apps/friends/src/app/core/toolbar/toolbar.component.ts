import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dancoto-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
