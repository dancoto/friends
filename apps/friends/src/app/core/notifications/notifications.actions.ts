import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
  '[Notifications] Show Notification',
  props<{ message: string }>()
);
