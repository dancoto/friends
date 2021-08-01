import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { showNotification } from '../../core/notifications/notifications.actions';
import { NotificationsEffects } from './notifications.effects';
import { NotificationsService } from './notifications.service';

describe('NotificationsEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: NotificationsEffects;
  let notificationsService: NotificationsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsEffects, provideMockActions(() => actions$)],
      imports: [MatSnackBarModule, NoopAnimationsModule],
    });
    effects = TestBed.inject<NotificationsEffects>(NotificationsEffects);
    notificationsService = TestBed.inject(NotificationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showNotification', () => {
    it('should should a notification on showNotification', fakeAsync(() => {
      jest.spyOn(notificationsService, 'showNotification');

      actions$ = of(showNotification);

      effects.showNotification$.subscribe();
      expect(notificationsService.showNotification).toHaveBeenCalled();
      tick(200);
    }));
  });
});
