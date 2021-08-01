import { v4 as uuidv4 } from 'uuid';
import { selectFriends } from './friends.selectors';
import { FriendsFeatureState } from './reducers';
describe('FriendSelectors', () => {
  const firstId = uuidv4();
  const secondId = uuidv4();
  const initialState: Partial<FriendsFeatureState> = {
    friends: [
      {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
        id: firstId,
      },
      {
        name: 'Daniel-Coto',
        friends: 2,
        age: 999,
        weight: 84,
        id: secondId,
      },
    ],
  };

  it('should select friends', () => {
    const result = selectFriends.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[1].id).toEqual(secondId);
  });
});
