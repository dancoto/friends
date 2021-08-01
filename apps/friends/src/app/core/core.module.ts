import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { NotificationsEffects } from './notifications/notifications.effects';
import { ToolbarComponent } from './toolbar/toolbar.component';

// Core Module to handle global level items like toolbars, notifications etc
@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSnackBarModule,
    EffectsModule.forFeature([NotificationsEffects]),
  ],
  exports: [ToolbarComponent],
})
export class CoreModule {}
