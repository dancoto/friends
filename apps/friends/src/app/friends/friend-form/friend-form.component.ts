import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Friend } from '@dancoto/types';
import { NAME_PATTERN, NUMERIC_PATTERN } from '../../utils/regex-patterns';

@Component({
  selector: 'dancoto-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendFormComponent {
  @Output() readonly addFriend: EventEmitter<Friend> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      friends: [
        null,
        [
          Validators.required,
          Validators.pattern(NUMERIC_PATTERN),
          Validators.min(0),
        ],
      ],
      age: [
        null,
        [
          Validators.required,
          Validators.pattern(NUMERIC_PATTERN),
          Validators.min(1),
        ],
      ],
      weight: [
        null,
        [
          Validators.required,
          Validators.pattern(NUMERIC_PATTERN),
          Validators.min(1),
        ],
      ],
    });
  }

  add() {
    if (this.form.valid) {
      this.addFriend.emit(this.form.value);
      this.clear();
    }
  }

  clear() {
    this.form.reset();
  }
}
