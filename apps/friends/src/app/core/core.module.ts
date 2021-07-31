import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';

// Core Module to handle global level items like toolbars, menus etc
@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [ToolbarComponent],
})
export class CoreModule {}
