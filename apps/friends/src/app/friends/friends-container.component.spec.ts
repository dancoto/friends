import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { Friend } from '@dancoto/types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { v4 as uuidv4 } from 'uuid';
import { AxisOptions } from './friend-detail/friend-detail.constants';
import { FriendsContainerComponent } from './friends-container.component';
import { setXAxis, setYAxis } from './store/chart.actions';
import { addFriend, deleteFriend, fetchFriends } from './store/friends.actions';

describe('FriendsContainerComponent', () => {
  let component: FriendsContainerComponent;
  let fixture: ComponentFixture<FriendsContainerComponent>;
  let store: MockStore;
  @Component({ selector: 'dancoto-friend-form', template: '' })
  class FriendFormComponent {}

  @Component({ selector: 'dancoto-friend-detail', template: '' })
  class FriendDetailComponent {
    @Input() friends!: Friend[];
    @Input() xAxis!: AxisOptions;
    @Input() yAxis!: AxisOptions;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FriendsContainerComponent,
        FriendFormComponent,
        FriendDetailComponent,
      ],
      imports: [MatButtonModule],
      providers: [provideMockStore({ initialState: [] })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsContainerComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch fetch on init', () => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchFriends());
    });
  });

  describe('addFriend', () => {
    it('should dispatch addFriend', () => {
      const friend = {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
      };
      component.addFriend(friend);
      expect(store.dispatch).toHaveBeenCalledWith(addFriend({ friend }));
    });
  });

  describe('deleteFriend', () => {
    it('should dispatch deleteFriend', () => {
      const id = uuidv4();
      component.deleteFriendById(id);
      expect(store.dispatch).toHaveBeenCalledWith(deleteFriend({ id }));
    });
  });

  describe('changeXAxis', () => {
    it('should dispatch setXAxis', () => {
      const xAxis: AxisOptions = 'age';
      component.changeXAxis(xAxis);
      expect(store.dispatch).toHaveBeenCalledWith(setXAxis({ xAxis }));
    });
  });

  describe('changeYAxis', () => {
    it('should dispatch setYAxis', () => {
      const yAxis: AxisOptions = 'age';
      component.changeYAxis(yAxis);
      expect(store.dispatch).toHaveBeenCalledWith(setYAxis({ yAxis }));
    });
  });
});
