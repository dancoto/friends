import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFriendsTableComponent } from './manage-friends-table.component';

describe('ManageFriendsTableComponent', () => {
  let component: ManageFriendsTableComponent;
  let fixture: ComponentFixture<ManageFriendsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFriendsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFriendsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
