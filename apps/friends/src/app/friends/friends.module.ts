import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { FriendFormComponent } from './friend-form/friend-form.component';
import { FriendsContainerComponent } from './friends-container.component';
import { FriendsEffects } from './store/friends.effects';
import { friendsReducer } from './store/friends.reducer';
@NgModule({
  declarations: [
    FriendsContainerComponent,
    FriendFormComponent,
    FriendDetailComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    // Making these features for modularity
    StoreModule.forFeature('friends', friendsReducer),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  exports: [FriendsContainerComponent],
})
export class FriendsModule {}
