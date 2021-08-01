import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_CONFIG } from './notifications.constants';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show a notification
   *
   * @param {string} message
   * @memberof NotificationsService
   */
  showNotification(message: string) {
    this.snackBar.open(message, '', SNACKBAR_CONFIG);
  }
}
