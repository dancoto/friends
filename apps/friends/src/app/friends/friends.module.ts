import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { ScatterPlotComponent } from './friend-detail/scatter-plot/scatter-plot.component';
import { SettingsComponent } from './friend-detail/settings/settings.component';
import { FriendFormComponent } from './friend-form/friend-form.component';
import { FriendsContainerComponent } from './friends-container.component';
import { ManageFriendsTableComponent } from './manage-friends/manage-friends-table/manage-friends-table.component';
import { ManageFriendsComponent } from './manage-friends/manage-friends.component';
import { FriendsEffects } from './store/friends.effects';
import * as fromFriends from './store/reducers';
@NgModule({
  declarations: [
    FriendsContainerComponent,
    FriendFormComponent,
    FriendDetailComponent,
    ScatterPlotComponent,
    SettingsComponent,
    ManageFriendsComponent,
    ManageFriendsTableComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    // Making these features for modularity
    StoreModule.forFeature(
      fromFriends.featureName,
      fromFriends.friendsFeatureReduder
    ),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  exports: [FriendsContainerComponent],
})
export class FriendsModule {}
