import { Friend } from '@dancoto/types';
import { createFeatureSelector } from '@ngrx/store';

export const selectFriends = createFeatureSelector<Friend[]>('friends');
