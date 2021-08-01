import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dancoto-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
