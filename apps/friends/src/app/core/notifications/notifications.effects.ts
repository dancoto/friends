import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { showNotification } from './notifications.actions';
import { NotificationsService } from './notifications.service';
@Injectable()
export class NotificationsEffects {
  // To test this go into friends service and make the responses errors

  showNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showNotification),
        tap(({ message }) =>
          this.notificationsService.showNotification(message)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private notificationsService: NotificationsService
  ) {}
}
