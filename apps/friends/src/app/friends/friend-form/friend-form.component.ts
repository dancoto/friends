import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Friend } from '@dancoto/types';

@Component({
  selector: 'dancoto-friend-form',
  templateUrl: './friend-form.component.html',
  styleUrls: ['./friend-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendFormComponent implements OnInit {
  form: FormGroup;
  @Output() readonly addFriend: EventEmitter<Friend> = new EventEmitter();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^[a-zA-Z'-]+$")]],
      friends: [null],
      age: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ],
      ],
      weight: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  add() {
    if (this.form.valid) {
      this.addFriend.emit(this.form.value);
      this.form.reset();
    }
  }
}
