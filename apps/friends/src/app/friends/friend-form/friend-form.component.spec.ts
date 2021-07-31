import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FriendFormComponent } from './friend-form.component';

describe('FriendFormComponent', () => {
  let component: FriendFormComponent;
  let fixture: ComponentFixture<FriendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendFormComponent],
      imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with the four fields after creation', () => {
    expect(component.form.get('name')?.value).toBe(null);
    expect(component.form.get('friends')?.value).toBe(null);
    expect(component.form.get('age')?.value).toBe(null);
    expect(component.form.get('weight')?.value).toBe(null);
  });

  it('should emit event and reset form if valid', () => {
    const expectedEmitValue = {
      name: 'Daniel Coto',
      age: '100',
      friends: '3',
      weight: '140',
    };
    const emitSpy = jest.spyOn(component.addFriend, 'emit');
    const resetSpy = jest.spyOn(component.form, 'reset');

    component.add();

    expect(emitSpy).not.toBeCalled();
    expect(resetSpy).not.toBeCalled();

    component.form.setValue(expectedEmitValue);

    component.add();

    expect(emitSpy).toHaveBeenCalledWith(expectedEmitValue);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('clear should reset the form', () => {
    const startingFormValue = {
      name: 'Daniel Coto',
      age: '100',
      friends: '3',
      weight: '140',
    };

    const expectedFormVal = {
      name: null,
      age: null,
      friends: null,
      weight: null,
    };
    component.form.setValue(startingFormValue);
    const resetSpy = jest.spyOn(component.form, 'reset');

    component.clear();
    expect(resetSpy).toHaveBeenCalled();
    expect(component.form.value).toEqual(expectedFormVal);
  });
});
