import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ManageFriendsTableComponent } from './manage-friends-table.component';

describe('ManageFriendsTableComponent', () => {
  let component: ManageFriendsTableComponent;
  let fixture: ComponentFixture<ManageFriendsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFriendsTableComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
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
