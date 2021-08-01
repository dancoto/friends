import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deleteFriend } from '../store/friends.actions';
import { ManageFriendsComponent } from './manage-friends.component';

describe('ManageFriendsComponent', () => {
  let component: ManageFriendsComponent;
  let fixture: ComponentFixture<ManageFriendsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFriendsComponent],
      providers: [
        provideMockStore({
          initialState: {
            friends: [],
            chart: {},
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFriendsComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteFriendById', () => {
    it('should dispatch deleteFriend', () => {
      jest.spyOn(store, 'dispatch').mockImplementation(() => {});
      let id = '1234';
      component.deleteFriendById(id);
      expect(store.dispatch).toHaveBeenCalledWith(deleteFriend({ id }));
    });
  });
});
