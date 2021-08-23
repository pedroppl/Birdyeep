import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedTagPostsPageRoutingModule } from './selected-tag-posts-routing.module';

import { SelectedTagPostsPage } from './selected-tag-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedTagPostsPageRoutingModule
  ],
  declarations: [SelectedTagPostsPage]
})
export class SelectedTagPostsPageModule {}
