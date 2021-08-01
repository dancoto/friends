import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFriendsComponent } from './manage-friends.component';

describe('ManageFriendsComponent', () => {
  let component: ManageFriendsComponent;
  let fixture: ComponentFixture<ManageFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
