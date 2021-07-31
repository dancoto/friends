import { Injectable } from '@angular/core';
import { Friend } from '@dancoto/types';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  fakeTimeout = 200; //Timeout to simulate latency
  constructor() {} // would be including HttpClient if we were doing actual API calls

  fetchFriends(): Observable<Friend[]> {
    return of([]).pipe(timeout(this.fakeTimeout));
  }

  addFriend(friend: Friend): Observable<string> {
    // For mocking, assuming API is returning a unique ID which will be assigned to each person
    return of(uuidv4()).pipe(timeout(this.fakeTimeout));
  }

  deleteFriend(id: string): Observable<boolean> {
    return of(true).pipe(timeout(this.fakeTimeout));
  }
}
