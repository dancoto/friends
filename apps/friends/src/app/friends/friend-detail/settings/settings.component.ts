import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AxisOptions, CHART_AXIS_OPTIONS } from '../friend-detail.constants';
@Component({
  selector: 'dancoto-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  @Input() xAxis!: AxisOptions;
  @Input() yAxis!: AxisOptions;
  @Input() count!: number;
  @Output() readonly settingsXAxisChanged: EventEmitter<AxisOptions> =
    new EventEmitter();
  @Output() readonly settingsYAxisChanged: EventEmitter<AxisOptions> =
    new EventEmitter();
  @Output() readonly settingsManageFriends: EventEmitter<void> =
    new EventEmitter();
  options = CHART_AXIS_OPTIONS;
}
