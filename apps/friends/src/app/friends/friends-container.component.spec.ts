import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { v4 as uuidv4 } from 'uuid';
import { FriendsContainerComponent } from './friends-container.component';
import { addFriend, deleteFriend, fetchFriends } from './store/friends.actions';

describe('FriendsContainerComponent', () => {
  let component: FriendsContainerComponent;
  let fixture: ComponentFixture<FriendsContainerComponent>;
  let store: MockStore;
  @Component({ selector: 'dancoto-friend-form', template: '' })
  class FriendFormComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsContainerComponent, FriendFormComponent],
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
});
