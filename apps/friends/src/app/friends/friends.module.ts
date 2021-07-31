import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { ScatterPlotComponent } from './friend-detail/scatter-plot/scatter-plot.component';
import { FriendFormComponent } from './friend-form/friend-form.component';
import { FriendsContainerComponent } from './friends-container.component';
import { FriendsEffects } from './store/friends.effects';
import { friendsReducer } from './store/friends.reducer';
@NgModule({
  declarations: [
    FriendsContainerComponent,
    FriendFormComponent,
    FriendDetailComponent,
    ScatterPlotComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    // Making these features for modularity
    StoreModule.forFeature('friends', friendsReducer),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  exports: [FriendsContainerComponent],
})
export class FriendsModule {}
